//CONSTANTS
const sizesInfoURL = "/js/sizesinfo.json";

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

// function validateDelivery() {
//   "use strict";
//   let deliveryValid = true;

//   //Validate name
//   $("#deliveryName").removeClass("is-valid").removeClass("is-invalid");
//   let name = $("#deliveryName").val();
//   if (validateTextOnly(name)) $("#deliveryName").addClass("is-valid");
//   else {
//     $("#deliveryName").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Validate address type
//   $("#deliveryAddrType").removeClass("is-valid").removeClass("is-invalid");
//   let addrType = $("#deliveryAddrType").val();
//   if (addrType !== "0") $("#deliveryAddrType").addClass("is-valid");
//   else {
//     $("#deliveryAddrType").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Validate address type other
//   $("#deliveryAddrTypeOther").removeClass("is-valid").removeClass("is-invalid");
//   let addrTypeOther = $("#deliveryAddrTypeOther").val();
//   if (validateTextOnly(addrTypeOther)) $("#deliveryAddrTypeOther").addClass("is-valid");
//   else {
//     $("#deliveryAddrTypeOther").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Validate address
//   $("#deliveryAddress").removeClass("is-valid").removeClass("is-invalid");
//   let address = $("#deliveryAddress").val();
//   if (address.length > 0) $("#deliveryAddress").addClass("is-valid");
//   else {
//     $("#deliveryAddress").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Validate city
//   $("#deliveryCity").removeClass("is-valid").removeClass("is-invalid");
//   let city = $("#deliveryCity").val();
//   if (validateTextOnly(city)) $("#deliveryCity").addClass("is-valid");
//   else {
//     $("#deliveryCity").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Validate state
//   $("#deliveryState").removeClass("is-valid").removeClass("is-invalid");
//   let state = $("#deliveryState").val();
//   if (validateState(state)) $("#deliveryState").addClass("is-valid");
//   else {
//     $("#deliveryState").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Validate zip
//   $("#deliveryZip").removeClass("is-valid").removeClass("is-invalid");
//   let zip = $("#deliveryZip").val();
//   if (validateZip(zip)) $("#deliveryZip").addClass("is-valid");
//   else {
//     $("#deliveryZip").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Validate zip
//   $("#deliveryPhone").removeClass("is-valid").removeClass("is-invalid");
//   let phone = $("#deliveryPhone").val();
//   if (validatePhoneNumber(phone)) $("#deliveryPhone").addClass("is-valid");
//   else {
//     $("#deliveryPhone").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Validate email
//   $("#deliveryEmail").removeClass("is-valid").removeClass("is-invalid");
//   let email = $("#deliveryEmail").val();
//   if (validateEmail(email)) $("#deliveryEmail").addClass("is-valid");
//   else {
//     $("#deliveryEmail").addClass("is-invalid");
//     deliveryValid = false;
//   }

//   //Is delivery form valid?
//   window.console.log("Form: " + deliveryValid);
// }

let createOrder = function () {
  "use strict";

  let deliveryValid, orderBuild, sizesInfo, loadSizesInfo, validateDeliveryInfo, updateSizes, updateBuildOptions, updateBuildTotals;
  //PRIVATE MEMBERS
  orderBuild = {
    dough: "",
    sizeCharge: 0,
    cheeseCharge: 0,
    sauceCharge: 0,
    toppingsCharge: 0,
  };
  loadSizesInfo = function () {
    $.getJSON(sizesInfoURL, function (data) {
      sizesInfo = data;
      window.console.log(sizesInfo);
    });
  };

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
    //PENDING: Remove after final code
    deliveryValid = true;

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
    if (size === null) {
      orderBuild.dough = "";
      orderBuild.sizeCharge = 0;
      orderBuild.cheeseCharge = 0;
      orderBuild.sauceCharge = 0;
      orderBuild.toppingsCharge = 0;
    } else {
      orderBuild.dough = "";
      orderBuild.sizeCharge = Number(size);
      orderBuild.cheeseCharge = Number(dropCheese.val());
      orderBuild.sauceCharge = Number(dropSauce.val());
      let toppingsCount = 0;
      toppingsStr = "";
      $("input[name='toppings']:checked").each(function () {
        toppingsCount++;
        toppingsStr = toppingsStr + $(this).val() + ", ";
        // window.console.log($(this).val());
      });
      orderBuild.toppingsCharge = 0.99 * toppingsCount;
    }

    totalCharge = orderBuild.sizeCharge + orderBuild.cheeseCharge + orderBuild.sauceCharge + orderBuild.toppingsCharge;
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

  //PUBLIC MEMBERS
  return {
    initOrder: function () {
      $("#frmBuildOrder").hide();
      loadSizesInfo();
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
    // let count = 0;
    // $("input[name='toppings']:checked").each(function () {
    //   count++;
    // });
    // window.console.log("total toppings: " + count);
  });

  $("#btnBuildNext").on("click", function () {
    $("#finishModal").modal("hide");
  });
});
