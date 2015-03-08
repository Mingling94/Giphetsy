var express = require('express');
var router = express.Router();
var randomWords = require('random-words');
var request = require('request');

var first = "temp";
var second = "temp";
var third = "temp";
var fourth = "temp";
var fifth = "temp";
var sixth = "temp";

/* GET home page. */
router.get('/', function(req, res, next) {
    var r1 = randomWords();
    var r2 = randomWords();
    var r3 = randomWords();
    var r4 = randomWords();
    var r5 = randomWords();
    var r6 = randomWords();
    console.log("1. " + r1 + '\n' +
                "2. " + r2 + '\n' +
                "3. " + r3 + '\n' +
                "4. " + r4 + '\n' +
                "5. " + r5 + '\n' +
                "6. " + r6 + '\n'
    );

    getImage(r1,function(result){
        first = result;
        getImage(r2,function(result){
            second = result;
            getImage(r3,function(result){
                third = result;
                getImage(r4,function(result){
                    fourth = result;
                    getImage(r5,function(result){
                        fifth = result;
                        getImage(r6,function(result){
                            sixth = result;
                            res.render('index',{'title':'Giphetsy',
                                'img1':first,
                                'rand1':r1,
                                'img2':second,
                                'rand2':r2,
                                'img3':third,
                                'rand3':r3,
                                'img4':fourth,
                                'rand4':r4,
                                'img5':fifth,
                                'rand5':r5,
                                'img6':sixth,
                                'rand6':r6
                            });
                            console.log("res.render completed");
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;

function getImage(tag,callback){

    var base_url = "http://api.giphy.com/v1/gifs/search?q=";
    var api_key = "dc6zaTOxFJmzC";
    var giphy_url = base_url + tag + "&limit=1&api_key=" + api_key;

    var final_url = "null";

    request(giphy_url,function(error,response,body){
        if(!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            var obj2 = obj.data[0];
            var images = obj2.images;
            var fixed_height = images.fixed_height;
            var url = fixed_height.url;
            //console.log("callback about to execute");
            callback(url);
            //console.log("url was " + url);
        }
    })
}
