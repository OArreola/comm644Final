function validateTextOnly(elementValue) {
  if (elementValue.length > 0) {
    let pattern = /^(?![\s.]+$)[a-zA-Z\s.]*$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validateState(elementValue) {
  if (elementValue.length > 0 && elementValue.length <= 2) {
    let pattern = /^(?![\s.]+$)[a-zA-Z\s.]*$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validateZip(elementValue) {
  if (elementValue.length > 0) {
    let pattern = /^\d{5}$|^\d{5}-\d{4}$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validatePhoneNumber(elementValue) {
  if (elementValue.length > 0) {
    let pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validateEmail(elementValue) {
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}

function validateDelivery() {
  let deliveryValid = true;

  //Validate name
  $("#deliveryName").removeClass("is-valid").removeClass("is-invalid");
  let name = $("#deliveryName").val();
  if (validateTextOnly(name)) $("#deliveryName").addClass("is-valid");
  else {
    $("#deliveryName").addClass("is-invalid");
    deliveryValid = false;
  }

  //Validate address type
  $("#deliveryAddrType").removeClass("is-valid").removeClass("is-invalid");
  let addrType = $("#deliveryAddrType").val();
  if (addrType !== "0") $("#deliveryAddrType").addClass("is-valid");
  else {
    $("#deliveryAddrType").addClass("is-invalid");
    deliveryValid = false;
  }

  //Validate address type other
  $("#deliveryAddrTypeOther").removeClass("is-valid").removeClass("is-invalid");
  let addrTypeOther = $("#deliveryAddrTypeOther").val();
  if (validateTextOnly(addrTypeOther)) $("#deliveryAddrTypeOther").addClass("is-valid");
  else {
    $("#deliveryAddrTypeOther").addClass("is-invalid");
    deliveryValid = false;
  }

  //Validate address
  $("#deliveryAddress").removeClass("is-valid").removeClass("is-invalid");
  let address = $("#deliveryAddress").val();
  if (address.length > 0) $("#deliveryAddress").addClass("is-valid");
  else {
    $("#deliveryAddress").addClass("is-invalid");
    deliveryValid = false;
  }

  //Validate city
  $("#deliveryCity").removeClass("is-valid").removeClass("is-invalid");
  let city = $("#deliveryCity").val();
  if (validateTextOnly(city)) $("#deliveryCity").addClass("is-valid");
  else {
    $("#deliveryCity").addClass("is-invalid");
    deliveryValid = false;
  }

  //Validate state
  $("#deliveryState").removeClass("is-valid").removeClass("is-invalid");
  let state = $("#deliveryState").val();
  if (validateState(state)) $("#deliveryState").addClass("is-valid");
  else {
    $("#deliveryState").addClass("is-invalid");
    deliveryValid = false;
  }

  //Validate zip
  $("#deliveryZip").removeClass("is-valid").removeClass("is-invalid");
  let zip = $("#deliveryZip").val();
  if (validateZip(zip)) $("#deliveryZip").addClass("is-valid");
  else {
    $("#deliveryZip").addClass("is-invalid");
    deliveryValid = false;
  }

  //Validate zip
  $("#deliveryPhone").removeClass("is-valid").removeClass("is-invalid");
  let phone = $("#deliveryPhone").val();
  if (validatePhoneNumber(phone)) $("#deliveryPhone").addClass("is-valid");
  else {
    $("#deliveryPhone").addClass("is-invalid");
    deliveryValid = false;
  }

  //Validate email
  $("#deliveryEmail").removeClass("is-valid").removeClass("is-invalid");
  let email = $("#deliveryEmail").val();
  if (validateEmail(email)) $("#deliveryEmail").addClass("is-valid");
  else {
    $("#deliveryEmail").addClass("is-invalid");
    deliveryValid = false;
  }

  //Is delivery form valid?
  window.console.log("Form: " + deliveryValid);
}

$(function () {
  //window.console.log("jquery loaded");
  //$("#deliveryAddress").css("font-weight", "bold");
  //window.console.log($("#deliveryAddress").val());

  //$("#delAddTypeOther").hide();
  $("#btnDelivery").on("click", function () {
    validateDelivery();
  });
  $("#deliveryAddrType").change(function () {
    if ($("#deliveryAddrType").val() === "7") {
      $("#delAddTypeOther").show();
    } else {
      $("#delAddTypeOther").hide();
    }
  });
  $("#deliveryAddrType").change();
});
