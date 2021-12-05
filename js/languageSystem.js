// load the json file and save it in the variable
var languageFile = loadJSON("./js/json/languages.json");
var language = getLanguage();

printObject(language);


document.addEventListener("DOMContentLoaded", function() {
    // read all elements with aria-label
    let elements = document.querySelectorAll("[aria-label]");
    // for each element, get the aria-label value and replace it with the language value from the json file, following the pattern language.key where language is the language and key is the key in the json file
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        let key = element.getAttribute("aria-label");
        // if the key is not null
        if (key != null) {
            // get the value from the language file array
            let value = key.split(".");
            // if the value is not null
            if (value != null) {
                // check if the value is a key in the json file
                if (languageFile[language[0]][value] != undefined) {
                    // replace the value with the value from the json file
                    element.innerHTML = languageFile[language[0]][value];
                } else {
                    element.innerHTML = "key " + languageFile[language[0]][value] +
                        " not found";
                    console.log([language[0]] + [value]);
                }
            } else {
                element.innerHTML = languageFile[language[0]][value]
                " not found";
            }
        }
    }
});






/*--------------------------------------------------+
|                    FUNCTIONS                      |
+---------------------------------------------------+
|                                                   |
|     This content was created by @Bryceed@8168     |
|               github.com/Bryceed                  |
|                                                   |
+--------------------------------------------------*/

// create a function to get the language
function getLanguage() {
    // get the language from the cookie
    var language = getCookie("language");
    // if the language is not set
    if (language == "") {
        language = navigator.language || navigator.userLanguage;
        // if the language is not set
        if (language == "") {
            // set the language to english
            language = ["en", "--"]
        }
    }
    if (language.indexOf("-") != -1) {
        language = [
            language.slice(0, language.indexOf("-")),
            language.slice(language.indexOf("-") + 1)
        ];
    } else if (language.indexOf("_") != -1) {
        language = [
            language.slice(0, language.indexOf("_")),
            language.slice(language.indexOf("_") + 1)
        ];
    }
    return language;
}

function getLanguageValue(language, languageFile, key) {
    lf = languageFile;
    //check if the key is in the json file
    if (lf[language[0]][key] != undefined) {
        // if the key is in the json file, return the value
        return lf[language[0]][key];
    } else {
        return language.key + " not found";
    }

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exhours = 24) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function loadJSON(path) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.send();
    if (xhr.status == 200) {
        return JSON.parse(xhr.responseText);
    } else {
        return null;
    }
}

function printObject(object) {
    for (var key in object) {
        console.log(key + ": " + object[key]);
    }
}