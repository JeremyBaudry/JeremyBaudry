(function () {
  var TRACKED_LABELS = {
    "C#": "C#",
    WPF: "WPF",
    MVVM: "MVVM",
    Angular: "Angular",
    API: "API",
    "Azure AD": "Azure AD",
    SQL: "SQL",
    "API Autodesk": "API Autodesk",
    InSitu: "InSitu"
  };

  var MANUAL_PERIODS = {
    MVVM: "2011-06/"
  };

  var TAG_TO_TRACKED = {
    "C#": "C#",
    WPF: "WPF",
    MVVM: "MVVM",
    Angular: "Angular",
    "API REST": "API",
    "ASP.NET Core": "API",
    "Azure AD": "Azure AD",
    "SQL Server": "SQL",
    "T-SQL": "SQL",
    "Revit API": "API Autodesk",
    AutoCAD: "API Autodesk",
    InSitu: "InSitu"
  };

  function monthIndex(year, month) {
    return year * 12 + month;
  }

  function parsePeriod(value) {
    var parts = value.split("/");
    var startParts = parts[0].split("-");
    var startYear = parseInt(startParts[0], 10);
    var startMonth = parseInt(startParts[1], 10);
    var endYear;
    var endMonth;

    if (parts[1]) {
      var endParts = parts[1].split("-");
      endYear = parseInt(endParts[0], 10);
      endMonth = parseInt(endParts[1], 10);
    } else {
      var now = new Date();
      endYear = now.getFullYear();
      endMonth = now.getMonth() + 1;
    }

    return {
      start: monthIndex(startYear, startMonth),
      end: monthIndex(endYear, endMonth)
    };
  }

  function mergeIntervals(intervals) {
    if (!intervals.length) return [];

    intervals.sort(function (a, b) {
      return a.start - b.start;
    });

    var merged = [intervals[0]];

    for (var i = 1; i < intervals.length; i++) {
      var last = merged[merged.length - 1];
      var current = intervals[i];

      if (current.start <= last.end + 1) {
        last.end = Math.max(last.end, current.end);
      } else {
        merged.push(current);
      }
    }

    return merged;
  }

  function intervalMonths(interval) {
    return interval.end - interval.start + 1;
  }

  function formatYears(totalMonths) {
    var years = Math.round(totalMonths / 12);
    if (years < 1 && totalMonths > 0) years = 1;
    return years + (years > 1 ? " ans" : " an");
  }

  function collectTechExperience() {
    var byTech = {};
    var missions = document.querySelectorAll(".exp-mission[data-period]");

    missions.forEach(function (mission) {
      var period = parsePeriod(mission.getAttribute("data-period"));
      var tags = mission.querySelectorAll(".tags-sm li");
      var counted = {};

      tags.forEach(function (tag) {
        var tracked = TAG_TO_TRACKED[tag.textContent.trim()];
        if (!tracked || counted[tracked]) return;
        counted[tracked] = true;
        if (!byTech[tracked]) byTech[tracked] = [];
        byTech[tracked].push({ start: period.start, end: period.end });
      });
    });

    Object.keys(MANUAL_PERIODS).forEach(function (tech) {
      byTech[tech] = [parsePeriod(MANUAL_PERIODS[tech])];
    });

    return Object.keys(byTech).map(function (tech) {
      var merged = mergeIntervals(byTech[tech]);
      var totalMonths = merged.reduce(function (sum, interval) {
        return sum + intervalMonths(interval);
      }, 0);

      return {
        tech: TRACKED_LABELS[tech] || tech,
        months: totalMonths,
        label: formatYears(totalMonths)
      };
    });
  }

  function renderTechExperience() {
    var list = document.getElementById("tech-experience-list");
    if (!list) return;

    var items = collectTechExperience()
      .filter(function (item) {
        return item.months > 0;
      })
      .sort(function (a, b) {
        if (b.months !== a.months) return b.months - a.months;
        return a.tech.localeCompare(b.tech, "fr");
      });

    var maxMonths = items.length ? items[0].months : 1;
    list.innerHTML = "";

    items.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "tech-years-item";

      var barWidth = Math.max(8, Math.round((item.months / maxMonths) * 100));

      li.innerHTML =
        '<span class="tech-years-name">' + item.tech + "</span>" +
        '<span class="tech-years-bar" aria-hidden="true">' +
        '<span class="tech-years-bar-fill" style="width:' + barWidth + '%"></span>' +
        "</span>" +
        '<span class="tech-years-duration">' + item.label + "</span>";

      li.setAttribute("title", item.tech + " — " + item.label);
      list.appendChild(li);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderTechExperience);
  } else {
    renderTechExperience();
  }
})();
