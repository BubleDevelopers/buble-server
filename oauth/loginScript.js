  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.

      ////////////////////
      // testAPI();     //
      // testFriends(); //
      ////////////////////

    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  exports.checkLoginState = function(callback){
    FB.getLoginStatus(function(response) {
      callback(response);
    });
  }

  exports.fbAsyncInit = function() {
  FB.init({
    appId      : '1593423827589449',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.3' // use version 2.3
  });
  exports.checkLoginState(statusChangeCallback);
}; 

/*
  // get name and write it to document field 'status'
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
	  console.log('Test response:');
	  console.log(response);
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  // get friends and display them to document field 'friends'
  function testFriends() {
    console.log('Looking up friends.... ');
    FB.api('/me/friends', function(response) {
	  console.log('Friend response object');
	  console.log(response);
      document.getElementById('friends').innerHTML =
        'We see that you have ' + response.summary.total_count + ' on FaceBook!';
    });
  }
*/