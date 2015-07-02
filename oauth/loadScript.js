  //////////////////////////
  // HOW TO GET USER INFO //
  //////////////////////////////////////////////////////////////////////////////
  //                                                                          //
  // FIRST you must include loadscript immediately below the open body tag of //
  // every page you want to load it on or this page will not work             //
  // in order to get user info you need to make a request to graph api        //
  // like in the examples below and include it in the statusChangeCallback    //
  // function in the login script inside of the if connected                  //
  //                                                                          //
  // When you use the me route you can access the following:                  //
  // email	first_name	last_name	name	id	              //
  //                                                                          //
  // /me/friends route you can only get a the total number of friends with    //
  // summary.total_count                                                      //
  //                                                                          //
  // You can get the user picture with /me/picture                            //
  // data.url 								      //
  //                                                                          //
  // The syntax above is correct. Examples can be found in the                //
  // oauth/loginScript.js file towards the bottom in the test functions       //
  //                                                                          //
  //////////////////////////////////////////////////////////////////////////////

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1593423827589449',
      xfbml      : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
