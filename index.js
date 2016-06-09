#!/usr/bin/env node
var fs           = require('fs');
var Converter    = require("csvtojson").Converter;
var CsvWriter    = require('csv-write-stream');
var converter    = new Converter({});
var csvwriter    = CsvWriter({
    sendHeaders: true
});

var redirectLine = "#Redirection 301";
var options      = process.argv.slice(2);
var extcsv       = options[0].slice(-3);
var regex        = /(http:\/\/)([a-z.]*)(.fr|.com)/;

if( extcsv === 'csv' ){

    converter.fromFile(options[0],function(err,result){

        if(err){
            console.log(err);
        }else{

            csvwriter.pipe( fs.createWriteStream(options[1] + './redirectionsresult.csv') )
            for(var i = 0; i < result.length; i++) {

                //Test si si les cellules url404 et url301 sont présente dans le fichier
                if( result[i].url404 != undefined && result[i].url301 != undefined){

                    //Test si l'ancienne url et/ou la nouvelle url sont bien renseignée(s)
                    if( result[i].url404 != "" && result[i].url301 != "" ){

                        if( result[i].todo == false ||  result[i].todo == undefined){

                            //Test la présence d'un ndd dans l'ancienne url
                            if( result[i].url404.charAt(0) == "/" ){
                                oldurl = result[i].url404;
                            }else{
                                oldurl = result[i].url404.replace(regex, "");
                            }

                            //Compile les rédirections dans une variable
                            console.log("RedirectPermanent " + oldurl + " " + result[i].url301);
                            redirectLine += "\nRedirectPermanent " + oldurl + " " + result[i].url301;
                        }

                        result[i].todo = true;

                    }else{
                        result[i].todo = false;
                    }
                    csvwriter.write(result[i]);

                }else{
                    console.log("Une ou l'intégralité des colonnes pré-requise ne sont pas renseignées, veuillez vérifier la présence des colonnes url404 et url301");
                }

            }

            csvwriter.end();

            //Copie les rédirections dans le fichier de sortie
            fs.writeFile(options[1] + './redirections.txt', redirectLine, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("Le fichier à été enregistré");
            })

        }

    });

}else{
    console.log("Le fichier de départ n'est pas un fichier csv");
}
