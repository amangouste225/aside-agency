"use strict"

jQuery(document).ready(function ($) {
  var homepage_portfolio_swiper_img = new Swiper(
    "div#portfolio-images-slider",
    {
      slidesPerView: 1,
      speed: 500,
      spaceBetween: 30,
      loop: true,
    }
  )

  var homepage_portfolio_swiper_txt = new Swiper(
    "div#portfolio-description-slider",
    {
      slidesPerView: 1,
      speed: 500,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: "button#selected-works-slider-next",
        prevEl: "button#selected-works-slider-prev",
      },
    }
  )

  new WOW().init()

  homepage_portfolio_swiper_img.controller.control =
    homepage_portfolio_swiper_txt
  homepage_portfolio_swiper_txt.controller.control =
    homepage_portfolio_swiper_img

  homepage_portfolio_swiper_txt.on("slideChange", function () {
    var index = homepage_portfolio_swiper_txt.realIndex + 1

    $("h1#portfolio-section-title-num").text("0" + index)
    $("span#portfolio-section-control-num").text("0" + index)
  })

  var homepage_team_swiper_img = new Swiper("div#team-images-slider", {
    slidesPerView: 8,
    speed: 500,
    spaceBetween: 1,
    loop: false,
    navigation: {
      nextEl: "button#team-slider-next",
      prevEl: "button#team-slider-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 1,
      },
      320: {
        slidesPerView: 3,
        spaceBetween: 1,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 1,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 1,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 1,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 1,
      },
      1400: {
        slidesPerView: 8,
        spaceBetween: 1,
      },
    },
  })

  homepage_team_swiper_img.on("slideChange", function () {
    var index = homepage_team_swiper_img.realIndex + 1

    $("h1#team-section-title-num").text("0" + index)
    $("span#team-section-control-num").text("0" + index)
  })

  $('[data-uiel="toggle-table-row"]').on("click", function (event) {
    event.preventDefault()

    var _self = $(this)

    var _trow = _self.closest("div.content-table__item")

    _trow.siblings("div.content-table__item").each(function (index, el) {
      $(el).removeClass("content-table__item_open")
      $(el).find("div.content-table__item-bp").slideUp(300)

      $(el).find("span.toggle-control_plus").removeClass("d-none")
      $(el).find("span.toggle-control_minus").addClass("d-none")
    })

    _trow.find("div.content-table__item-bp").slideToggle(300)

    if (_trow.find("span.toggle-control_plus").hasClass("d-none")) {
      _trow.removeClass("content-table__item_open")

      _trow.find("span.toggle-control_plus").removeClass("d-none")
      _trow.find("span.toggle-control_minus").addClass("d-none")
    } else {
      _trow.find("span.toggle-control_plus").addClass("d-none")
      _trow.find("span.toggle-control_minus").removeClass("d-none")
      _trow.addClass("content-table__item_open")
    }
  })

  $('[data-app="scroll-to-top"]').on("click", function () {
    jQuery("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    )
  })
})

String.prototype.format = function () {
  var a = this
  for (var k in arguments) {
    a = a.replace(new RegExp("\\{" + k + "\\}", "g"), arguments[k])
  }
  return a
}

function digitary_notification_message(message = "", type = "success") {
  $("body")
    .find("div.notification-message")
    .each(function (index, el) {
      $(el).remove()
    })
    .promise()
    .done(function () {
      var notif_id = new Date().getTime()

      $("body")
        .append(
          $("<div>", {
            id: "notification-message-{0}".format(notif_id),
            class: "notification-message notification-message_{0}".format(type),
            html: '<div class="notification-message__inner"><div class="notification-message__body"><p>{0}</p></div></div>'.format(
              message
            ),
          })
        )
        .promise()
        .done(function () {
          $("div#notification-message-{0}".format(notif_id)).animate(
            { top: "0" },
            1000,
            function () {
              $(this)
                .stop(true, true)
                .delay(3000)
                .queue(function () {
                  $(this).animate({ top: "-100%" }, 1000, function () {
                    $(this).remove()
                  })
                })
            }
          )
        })
    })
}

function toggle_mobile_nav() {
  $("[data-uiel=mobile-navbar]").toggleClass("mobile-navigation_open")

  $("body").toggleClass("ov-h")
}

// Preloader
