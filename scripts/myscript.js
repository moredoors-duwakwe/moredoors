var openAccount = function() {
  checkPassword()
}

var checkPassword = function() {
  var password = "lamba";
  var adminPassword = prompt("Enter administrative password");
  if (adminPassword === password) {
    $(document).ready(function() {
      $('.section').load("account_form.html");
    })

  } else if (adminPassword == "" || adminPassword == null) {
    return false;
  } else {
    alert("wrong password");
    openAccount();
  }
}

var getParams = function() {
	var firstName = document.getElementById("fstname").value;
	var lastName = document.getElementById("lstname").value;
	var passWord = document.getElementById("pword").value;
	var eMail = document.getElementById("mail").value;
  var aMount = document.getElementById("amount").value;

	constructParams(firstName, lastName, passWord, eMail, aMount);
}

var accountNumberGenerator = function () {
  return Math.floor((Math.random() * 10000) + 1) + Date.now();
}

var constructParams = function(f,l,p,e,a) {
  var userParams = {firstName: f, lastName: l, passWord: p, eMail: e, accountNumber: accountNumberGenerator(), amount: a };
  saveParams(userParams);

}

var saveParams = function(userParams) {
  var accNumber = userParams.accountNumber;
  var stringifyParams = JSON.stringify(userParams);
  localStorage.setItem(accNumber, stringifyParams);
  showAlert();
}

var showAlert = function() {
  var alertSuccess = $(".alert-success");
  alertSuccess.show().text("Account Successfully Created, here is your account number:" + accNumber); 
  document.getElementById("form-form").reset();
}

var getWithdrawalForm = function() {
   $(document).ready(function() {
      $('.section').load("withDraw.html");
    })
}

var getAccountNumberParams = function() {
  var acctNumberProvided = document.getElementById("form-details").value;
  var acctQuery = localStorage.getItem(acctNumberProvided);
  if (acctQuery == null) {
    alert("Invalid Account number");
  } else {
      var userObject = JSON.parse(acctQuery);
      var stringifyUserObjectParams = JSON.stringify(userObject);
      sessionStorage.setItem("currentUserKey", stringifyUserObjectParams);
      $(document).ready(function() {
        $('.section').load("user_profile.html", function() {
        document.getElementById("username").innerHTML=userObject.firstName +" "+ userObject.lastName;
        document.getElementById("useracct").innerHTML=userObject.amount;
        });
      })
  }
}

var getWithdrawAmount = function() {
  var cashAmount = document.getElementById("getCash").value;
  var parsedCurrentUser = JSON.parse(sessionStorage.getItem("currentUserKey"));
  var currentUserAcctNumber = parsedCurrentUser.accountNumber;
  var user = JSON.parse(localStorage.getItem(currentUserAcctNumber));
  var userAmount = (parseInt(user.amount) - parseInt(cashAmount));
  user["amount"]=userAmount
  localStorage.setItem(currentUserAcctNumber, JSON.stringify(user)); 
  document.getElementById("username").innerHTML=user.firstName +" "+ user.lastName;
  document.getElementById("useracct").innerHTML=user.amount;
}

var constructWithdrawParams = function () {
  var userWithrawParams = {cashAmount: c};

  saveWithdrawAmount(userWithrawParams);
}

var saveWithdrawAmount = function () {
  var withdrawAmount = userWithrawParams.cashAmount;
  var stringifyWithdrawParams = JSON.stringify(userWithrawParams);
  localStorage.setItem(cashAmount, stringifyWithdrawParams);
  showAlert();
}