//CONSTANTS
// const sizesInfoURL = "/js/sizesinfo.json";
const ccTypeNone = 0;
const ccTypeVisa = 1;
const ccTypeMasterCard = 2;
const ccTypeAmericanExpress = 3;
const ccLogos = [
  { src: "img/cc_none.png", alt: "Invalid Credit Card" },
  { src: "img/visa.png", alt: "Visa" },
  { src: "img/mastercard.png", alt: "MasterCard" },
  { src: "img/amex.png", alt: "American Express" },
];
const sizesInfoOptions = [
  {
    dough: "Hand Tossed",
    sizes: [
      { text: "Small ( $9.99 )", price: 9.99 },
      { text: "Medium ( $12.99 )", price: 12.99 },
      { text: "Large ( $14.99 )", price: 14.99 },
    ],
  },
  {
    dough: "Thin Crust",
    sizes: [
      { text: "Medium ($11.99)", price: 11.99 },
      { text: "Large ($13.99)", price: 13.99 },
    ],
  },
  {
    dough: "New York Style",
    sizes: [
      { text: "Large ($16.99)", price: 16.99 },
      { text: "Extra Large ($19.99)", price: 19.99 },
    ],
  },
  {
    dough: "Gluten Free",
    sizes: [{ text: "Small ($10.99)", price: 10.99 }],
  },
];

function validateTextOnly(elementValue) {
  "use strict";
  if (elementValue.length > 0) {
    let pattern = /^(?![\s.]+$)[a-zA-Z\s.]*$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validateState(elementValue) {
  "use strict";
  if (elementValue.length > 0 && elementValue.length <= 2) {
    let pattern = /^(?![\s.]+$)[a-zA-Z\s.]*$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validateZip(elementValue) {
  "use strict";
  if (elementValue.length > 0) {
    let pattern = /^\d{5}$|^\d{5}-\d{4}$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validatePhoneNumber(elementValue) {
  "use strict";
  if (elementValue.length > 0) {
    let pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validateEmail(elementValue) {
  "use strict";
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}

function validateCVV(elementValue) {
  "use strict";
  if (elementValue.length > 0) {
    let pattern = /^[0-9]{3,4}$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validateDigitsOnly(elementValue) {
  "use strict";
  if (elementValue.length > 0) {
    let pattern = /^\d+$/;
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

function validateCCNum(elementValue) {
  "use strict";
  if (elementValue.length >= 13) {
    let pattern = /^\d+$/; //Check for digits only
    return pattern.test(elementValue);
  } else {
    return false;
  }
}

let createOrder = function () {
  "use strict";

  //PRIVATE MEMBERS
  let deliveryValid,
    billingValid,
    billingCardValid,
    sizesInfo,
    validateDeliveryInfo,
    updateSizes,
    updateBuildOptions,
    updateBuildTotals,
    updateBilling,
    validateBillingInfo,
    validateCCNumber,
    validateCCLuhnFormula,
    updateCompletedOrder;

  validateDeliveryInfo = function () {
    deliveryValid = true;

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

    //Validate phone
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

    // deliveryValid = true;
    if (deliveryValid) {
      $("#frmDelivery").hide();
      $("#frmBuildOrder").show();
    }
  };

  updateSizes = function (dough) {
    let dropdown = $("#buildSize");
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Choose...</option>');
    dropdown.prop("selectedIndex", 0);

    for (let i = 0; i < sizesInfo.length; i++) {
      let doughInfo = sizesInfo[i];
      if (doughInfo.dough === dough) {
        let sizes = doughInfo.sizes;
        for (let j = 0; j < sizes.length; j++) {
          dropdown.append($("<option></option>").attr("value", sizes[j].price).text(sizes[j].text));
        }
        dropdown.prop("disabled", false);
      }
    }
  };
  updateBuildOptions = function () {
    let size = $("#buildSize").val();
    let dropCheese = $("#buildCheese");
    let dropSauce = $("#buildSauce");
    let toppings = $("input[name='toppings']");
    //Enable/disable options
    if (size === null) {
      dropCheese.prop("disabled", true);
      dropSauce.prop("disabled", true);
      toppings.each(function () {
        $(this).prop("disabled", true);
      });
    } else {
      dropCheese.prop("disabled", false);
      dropSauce.prop("disabled", false);
      toppings.each(function () {
        $(this).prop("disabled", false);
      });
    }
  };
  updateBuildTotals = function () {
    let size = $("#buildSize").val();
    let dropCheese = $("#buildCheese");
    let dropSauce = $("#buildSauce");
    let toppingsStr;
    let totalCharge = 0;

    if (size !== null) {
      totalCharge += Number(size);
      totalCharge += Number(dropCheese.val());
      totalCharge += Number(dropSauce.val());
      let toppingsCount = 0;
      toppingsStr = "";
      $("input[name='toppings']:checked").each(function () {
        toppingsCount++;
        toppingsStr = toppingsStr + $(this).val() + ", ";
        // window.console.log($(this).val());
      });
      totalCharge += 0.99 * toppingsCount;
    }
    // window.console.log("Total: " + totalCharge);
    $("#orderTotal").text("$ " + totalCharge.toFixed(2));
    if (size !== null) {
      $("#totalDough").text($("input[name='optDough']:checked").val());
      $("#totalSize").text($("#buildSize option:selected").text());
      $("#totalCheese").text($("#buildCheese option:selected").text());
      $("#totalSauce").text($("#buildSauce option:selected").text());
      $("#totalToppings").text(toppingsStr.slice(0, toppingsStr.length - 2));
    }
  };
  updateBilling = function () {
    let sameAddress = $("#chkSameAddress:checked");
    if (sameAddress.length === 1) {
      //Copy delivery info to billing info
      $("#billingName").val($("#deliveryName").val());
      $("#billingAddress").val($("#deliveryAddress").val());
      $("#billingAddressNum").val($("#deliveryAddressNum").val());
      $("#billingCity").val($("#deliveryCity").val());
      $("#billingState").val($("#deliveryState").val());
      $("#billingZip").val($("#deliveryZip").val());
    } else {
      //Clear billing info
      $("#billingName").val("");
      $("#billingAddress").val("");
      $("#billingAddressNum").val("");
      $("#billingCity").val("");
      $("#billingState").val("");
      $("#billingZip").val("");
    }
  };
  validateBillingInfo = function () {
    let validExpiration = true;
    billingValid = true;

    //Validate name
    $("#billingName").removeClass("is-valid").removeClass("is-invalid");
    let name = $("#billingName").val();
    if (validateTextOnly(name)) $("#billingName").addClass("is-valid");
    else {
      $("#billingName").addClass("is-invalid");
      billingValid = false;
    }

    //Validate address
    $("#billingAddress").removeClass("is-valid").removeClass("is-invalid");
    let address = $("#billingAddress").val();
    if (address.length > 0) $("#billingAddress").addClass("is-valid");
    else {
      $("#billingAddress").addClass("is-invalid");
      billingValid = false;
    }

    //Validate city
    $("#billingCity").removeClass("is-valid").removeClass("is-invalid");
    let city = $("#billingCity").val();
    if (validateTextOnly(city)) $("#billingCity").addClass("is-valid");
    else {
      $("#billingCity").addClass("is-invalid");
      billingValid = false;
    }

    //Validate state
    $("#billingState").removeClass("is-valid").removeClass("is-invalid");
    let state = $("#billingState").val();
    if (validateState(state)) $("#billingState").addClass("is-valid");
    else {
      $("#billingState").addClass("is-invalid");
      billingValid = false;
    }

    //Validate zip
    $("#billingZip").removeClass("is-valid").removeClass("is-invalid");
    let zip = $("#billingZip").val();
    if (validateZip(zip)) $("#billingZip").addClass("is-valid");
    else {
      $("#billingZip").addClass("is-invalid");
      billingValid = false;
    }

    //Validate Expiration Month
    $("#ccExpMonth").removeClass("is-valid").removeClass("is-invalid");
    let ccmonth = $("#ccExpMonth").val();
    if (ccmonth !== null) $("#ccExpMonth").addClass("is-valid");
    else {
      $("#ccExpMonth").addClass("is-invalid");
      billingValid = false;
      validExpiration = false;
    }

    //Validate Expiration Year
    $("#ccExpYear").removeClass("is-valid").removeClass("is-invalid");
    let ccyear = $("#ccExpYear").val();
    if (ccyear !== null) $("#ccExpYear").addClass("is-valid");
    else {
      $("#ccExpYear").addClass("is-invalid");
      billingValid = false;
      validExpiration = false;
    }

    //Validate Current Date
    let today = new Date();
    if (validExpiration) {
      if (Number(ccyear) > today.getFullYear()) {
      } else if (Number(ccyear) === today.getFullYear()) {
        window.console.log("Same year");
        if (Number(ccmonth) >= today.getMonth()) {
        } else {
          $("#ccExpMonth").next().text("Date is in the past");
          $("#ccExpMonth").removeClass("is-valid").addClass("is-invalid");
          $("#ccExpYear").next().text("Date is in the past");
          $("#ccExpYear").removeClass("is-valid").addClass("is-invalid");
        }
      }
    }

    //Validate CVV
    $("#ccCVV").removeClass("is-valid").removeClass("is-invalid");
    let cvv = $("#ccCVV").val();
    if (validateCVV(cvv)) $("#ccCVV").addClass("is-valid");
    else {
      $("#ccCVV").addClass("is-invalid");
      billingValid = false;
    }

    // billingValid = true;
  };
  validateCCNumber = function () {
    let cctype = ccTypeNone;
    let ccNumberStr = $("#billingCCNumber").val();
    ccNumberStr = ccNumberStr.replace(/\s/g, ""); //Remove empty space
    billingCardValid = true;
    $("#billingCCNumber").removeClass("is-valid").removeClass("is-invalid");
    if (validateCCNum(ccNumberStr)) {
      //Find Credit Card Type
      let prefix = Number(ccNumberStr.slice(0, 1));
      if (prefix === 4 && (ccNumberStr.length === 13 || ccNumberStr.length === 16)) {
        cctype = ccTypeVisa;
        // window.console.log("cctype" + cctype);
      } else {
        prefix = Number(ccNumberStr.slice(0, 2));
        if (prefix === 37 && ccNumberStr.length === 15) {
          cctype = ccTypeAmericanExpress;
        } else if (prefix >= 51 && prefix <= 55 && ccNumberStr.length === 16) {
          cctype = ccTypeMasterCard;
        }
      }
      $("#billingCCType").prop("src", ccLogos[cctype].src).prop("alt", ccLogos[cctype].alt);

      if (cctype === ccTypeNone) {
        $("#billingCCNumber").next().text("Card Type not recognized");
        billingCardValid = false;
      } else {
      }
    } else {
      billingCardValid = false;
    }

    if (billingCardValid) {
      $("#billingCCNumber").addClass("is-valid");
    } else {
      $("#billingCCNumber").addClass("is-invalid");
      billingValid = false;
    }
  };
  validateCCLuhnFormula = function () {
    let ccNumberStr = $("#billingCCNumber").val();
    ccNumberStr = ccNumberStr.replace(/\s/g, ""); //Remove empty space
    let sum = 0;
    let num;
    let count = 0;
    for (let i = ccNumberStr.length; i > 0; i--) {
      num = Number(ccNumberStr.slice(i - 1, i));
      count++;
      if (count % 2 === 0) {
        num *= 2;
      }
      sum = sum + Math.floor(num / 10) + (num % 10);
      // window.console.log(num + "," + sum);
    }
    if (sum % 10 === 0) {
      $("#billingCCNumber").addClass("is-valid");
    } else {
      $("#billingCCNumber").addClass("is-invalid");
      $("#billingCCNumber").next().text("Invalid Card Number");
      billingValid = false;
    }
  };

  updateCompletedOrder = function () {
    window.console.log("Here");
    $("#completeDough").text($("#totalDough").text());
    $("#completeSize").text($("#totalSize").text());
    $("#completeCheese").text($("#totalCheese").text());
    $("#completeSauce").text($("#totalSauce").text());
    $("#completeToppings").text($("#totalToppings").text());
    $("#completePrice").text($("#orderTotal").text());
  };

  //PUBLIC MEMBERS
  return {
    initOrder: function () {
      $("#frmBuildOrder").hide();
      $("#frmBilling").hide();
      $("#orderComplete").hide();
      sizesInfo = sizesInfoOptions;
      return this;
    },
    validateDelivery: function () {
      validateDeliveryInfo();
      return this;
    },
    updateBuild: function (evt) {
      if (evt.target.name === "optDough") {
        updateSizes(evt.target.value);
      }
      updateBuildOptions();
      updateBuildTotals();
      return this;
    },
    updateChkboxBilling: function () {
      updateBilling();
      return this;
    },
    validateBilling: function () {
      validateBillingInfo();
      validateCCNumber();
      if (billingCardValid) validateCCLuhnFormula();
      if (billingValid) {
        updateCompletedOrder();
        $("#orderingForm").hide();
        $("#orderComplete").show();
      }

      return this;
    },
  };
};

let pizzaOrder = createOrder();

$(function () {
  pizzaOrder.initOrder();
  $("#btnDeliveryNext").on("click", function () {
    pizzaOrder.validateDelivery();
  });
  $("#deliveryAddrType").change(function () {
    if ($("#deliveryAddrType").val() === "7") {
      $("#delAddTypeOther").show();
    } else {
      $("#delAddTypeOther").hide();
    }
  });
  $("#deliveryAddrType").change();

  $("#frmBuildOrder").change(function (evt) {
    pizzaOrder.updateBuild(evt);
  });

  $("#btnBuildPrev").on("click", function () {
    $("#frmBuildOrder").hide();
    $("#frmDelivery").show();
  });

  $("#chkSameAddress").on("click", function () {
    pizzaOrder.updateChkboxBilling();
  });

  $("#btnBuildNext").on("click", function () {
    $("#finishModal").modal("hide");
    $("#frmBuildOrder").hide();
    $("#frmBilling").show();
  });

  $("#btnConfirm").on("click", function () {
    pizzaOrder.validateBilling();
  });
});
