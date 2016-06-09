# Génération de redirection 301
Script node.js permettant de formatter des redirections 301 à destination d'un fichier.htaccess.

Une fois le script éxécuté, celui-ci créer une nouvelle version du fichier **redirectionsresult.csv** avec un nouveau paramètre **todo** qui indique si la redirection à déjà été générée et un fichier **redirections.txt**.

Le fichier **redirectionsresult.csv** peut être completer avec de nouvelles urls de redirection qui n'étaient pas renseignées lors de la précédente éxécution.

Le fichier **redirections.txt** peut être copier/coller directement dans le fichier .htacces du site avant d'être soumis à google. [https://www.google.com/webmasters/tools/](https://www.google.com/webmasters/tools/)

Installation du module
```
$npm install -g
```
Éxécution du script, celui-ci prend en compte deux paramètres
```
$redirect301 param1 param2
```
**param1** : url absolue vers le fichier csv qui contient les redirections
**param2** : url absolue du dossier dans lequel vous souhaitez récupérer les éléments en sortie de script

# Exemple d'un fichier csv valide
Le formatage des redirections ce fait à partir d'un fichier .csv celui-ci doit au minimum posséder les colonnes suivantes pour la bonne éxécution du script [url404, url301]
```
{
    url404: http://ndd.com/oldurl,
    url301: http://ndd.com/newurl
}
```
