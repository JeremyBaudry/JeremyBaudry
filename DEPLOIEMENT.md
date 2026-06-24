# Mise en ligne du site — guide simple

Votre site est prêt dans ce dossier. Aucun logiciel à installer : ce sont des fichiers HTML/CSS/JS.

## Étape 1 — Prévisualiser en local

Double-cliquez sur `index.html` pour ouvrir le site dans votre navigateur.

## Étape 2 — Mettre en ligne gratuitement (Cloudflare Pages)

1. Créez un compte sur [cloudflare.com](https://dash.cloudflare.com/sign-up) (gratuit).
2. Allez dans **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
3. Glissez-déposez tout le contenu du dossier `SiteJeremy` (index.html, css/, js/, public/, robots.txt, sitemap.xml).
4. Nommez le projet (ex. `jeremy-baudry`) → **Deploy**.
5. Votre site sera accessible sur `https://jeremy-baudry.pages.dev` (ou un nom similaire).

## Étape 3 — Statistiques de visite (gratuit)

1. Dans Cloudflare → votre site Pages → **Metrics** → **Web Analytics**.
2. Activez **Web Analytics** et copiez le token.
3. Dans `index.html`, décommentez la ligne Cloudflare Analytics et remplacez `YOUR_TOKEN` par votre token.

## Étape 4 — Formulaire de contact

Le formulaire utilise [FormSubmit](https://formsubmit.co) (gratuit).

- Au **premier message** reçu, FormSubmit vous enverra un email de confirmation : cliquez le lien une seule fois.
- Ensuite, tous les messages arriveront sur `jeremy.baudry@outlook.fr`.

Dans `index.html`, remplacez `https://jeremy-baudry.pages.dev` par votre vraie URL après déploiement (champ `_next` du formulaire).

## Étape 5 — Domaine personnalisé (optionnel)

Dans Cloudflare Pages → **Custom domains** :

- Sous-domaine gratuit : `votrenom.pages.dev`
- Ou connectez un domaine que vous possédez (ex. `jbcode.fr`)

Pensez à mettre à jour l’URL dans `index.html` (canonical, sitemap.xml, robots.txt, formulaire).

## CV en PDF (recommandé)

Le CV est en `.docx`. Pour un téléchargement plus pro :

1. Ouvrez `Resources/Jérémy BAUDRY.docx` dans Word.
2. **Fichier → Enregistrer sous → PDF**.
3. Enregistrez dans `public/cv-jeremy-baudry.pdf`.
4. Dans `index.html`, changez le lien du bouton CV vers le PDF.

## Ajouter d’autres liens plus tard

Section **Recommandations** dans `index.html` : dupliquez une carte `.proof-card` (comme LinkedIn ou Malt) et changez le titre, l’URL et la couleur.
