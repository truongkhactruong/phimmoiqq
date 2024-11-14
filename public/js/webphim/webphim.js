$(document).ready(function () {
  let currentIndex = 0;
  const items = $(".carousel-item");
  const totalItems = items.length;
  const carousel = $("#carousel");
  const pageIndexItems = $(".page-index");
  const carouselItemsContainer = $("#carousel-items");
  const carouselWidth = carousel.width();
  const itemWidth = items.outerWidth(true); // Bao gồm cả margin
  let startX = 0;
  let diff = 0;

  // Hàm cập nhật carousel để căn giữa banner được chọn
  function updateCarousel(index) {
    const offset = (carouselWidth - itemWidth) / 2 - index * itemWidth;
    items.css("transform", `translateX(${offset}px)`);

    // Thêm transition cho transform
    items.css("transition", "transform 0.5s ease-in-out");

    // Sau khi transition kết thúc, bắt đầu thay đổi hiệu ứng
    items.one("transitionend", function () {
      // Cập nhật hiệu ứng làm mờ và active
      items
        .removeClass("active-item blur-item")
        .eq(index)
        .addClass("active-item");
      items.not(":eq(" + index + ")").addClass("blur-item");

      // Cập nhật chỉ mục trang
      pageIndexItems
        .removeClass("bg-white")
        .addClass("bg-gray-400")
        .eq(index)
        .removeClass("bg-gray-400")
        .addClass("bg-white");

      // Cập nhật màu nền carousel
      const bgColor = items.eq(index).css("--main-color");
      carouselItemsContainer.css("background", bgColor);
    });
  }

  // Khi nhấn vào page index
  pageIndexItems.on("click", function () {
    currentIndex = $(this).data("index");
    updateCarousel(currentIndex);
  });

  // Khi nhấn vào banner thì chọn banner đó
  items.on("click", function () {
    currentIndex = items.index($(this));
    updateCarousel(currentIndex);
  });

  // Khi người dùng bắt đầu kéo
  carousel.on("mousedown touchstart", function (e) {
    startX = e.pageX || e.originalEvent.touches[0].pageX;
    diff = 0;
    e.preventDefault(); // Ngăn cuộn tự động khi chạm vào màn hình
    clearTimeout(autoSlideTimeout);
  });

  $(document).on("mousemove touchmove", function (e) {
    if (!startX) return;
    const x = e.pageX || e.originalEvent.touches[0].pageX;
    diff = ((startX - x) / itemWidth) * 30; // Tính khoảng cách kéo
    const offset = -currentIndex * itemWidth - diff;
    items.css("transform", `translateX(${offset}px)`);
  });

  // Khi người dùng thả chuột hoặc dừng kéo
  $(document).on("mouseup touchend", function (e) {
    if (!startX) return;
    const x = e.pageX || e.originalEvent.changedTouches[0].pageX;
    diff = startX - x;

    // Tính toán xem đã kéo đến slide tiếp theo hay chưa
    if (diff > 50 && currentIndex < totalItems - 1) {
      currentIndex++;
    } else if (diff < -50 && currentIndex > 0) {
      currentIndex--;
    }

    updateCarousel(currentIndex);
    startX = 0; // Reset giá trị startX sau khi kết thúc kéo
  });

  // Gọi hàm khi tải trang
  updateCarousel(currentIndex);
});

$(document).ready(function () {
  const $navbar = $("#header");
  const sticky = 90; // Vị trí để thêm hiệu ứng
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= sticky) {
      $navbar.addClass("sticky-top backdrop-blur bg-white text-black");
      $navbar.removeClass("text-white");
    } else {
      $navbar.addClass("text-white"); // Chữ trắng khi cuộn lại đầu
      $navbar.removeClass("backdrop-blur bg-white text-black");
    }
  });
});

function createScrollSlider(
  carouselSelector,
  prevBtnSelector,
  nextBtnSelector
) {
  var $carousel = $(carouselSelector);
  var $prevBtn = $(prevBtnSelector);
  var $nextBtn = $(nextBtnSelector);

  // Cập nhật trạng thái nút
  // function updateButtons() {
  //   var scrollLeft = $carousel.parent().scrollLeft();
  //   var scrollWidth = $carousel[0].scrollWidth;
  //   var containerWidth = $carousel.parent().outerWidth();

  //   if (scrollLeft === 0) {
  //     $prevBtn.css({
  //       opacity: 0,
  //       visibility: "visible",
  //       transition: "opacity 0.5s ease-in-out",
  //     });
  //   } else {
  //     $prevBtn.css({
  //       opacity: 0.8,
  //       visibility: "visible",
  //       transition: "opacity 0.5s ease-in-out",
  //     });
  //   }

  //   if (scrollLeft + containerWidth >= scrollWidth) {
  //     $nextBtn.css({
  //       opacity: 0,
  //       visibility: "visible",
  //       transition: "opacity 0.8s ease-in-out",
  //     });
  //   } else {
  //     $nextBtn.css({
  //       opacity: 0.8,
  //       visibility: "visible",
  //       transition: "opacity 0.8s ease-in-out",
  //     });
  //   }
  // }

  // // Kiểm tra khi trang được load
  // updateButtons();

  // // Bắt sự kiện cuộn
  // $carousel.parent().on("scroll", function () {
  //   updateButtons();
  // });

  // Sự kiện click nút Prev
  $prevBtn.on("click", function () {
    var newScrollLeft =
      $carousel.parent().scrollLeft() - $carousel.parent().width() / 3;
    $carousel.parent().animate(
      { scrollLeft: newScrollLeft },
      300, // Thời gian cuộn
      "easeInOutQuad" // Tùy chọn easing
    );
  });

  // Sự kiện click nút Next
  $nextBtn.on("click", function () {
    var newScrollLeft =
      $carousel.parent().scrollLeft() + $carousel.parent().width() / 3;
    $carousel.parent().animate(
      { scrollLeft: newScrollLeft },
      300, // Thời gian cuộn
      "easeInOutQuad" // Tùy chọn easing
    );
  });
}

$(document).ready(function () {
  // Khởi tạo slider cho phần slider đầu tiên
  createScrollSlider(
    "#carousel-outstanding",
    "#btn-prev-outstanding",
    "#btn-next-outstanding"
  );
  createScrollSlider(
    "#carousel-update",
    "#btn-prev-update",
    "#btn-next-update"
  );

  // Nếu có thêm slider khác, bạn có thể tạo thêm tương tự:
  // createScrollSlider("#carousel-2", "#btn-prev-2", "#btn-next-2");
});

function handleActive(groupSelector, buttonSelector, activeClass = "active") {
  $(groupSelector).on("click", buttonSelector, function () {
    $(groupSelector).find(buttonSelector).removeClass(activeClass);
    $(this).addClass(activeClass);
  });
}

const toggleMenu = (button, menuWrapper) => {
  $(button).on("click", function (e) {
    e.stopPropagation(); // Ngăn việc click tiếp tục lan truyền
    $(menuWrapper).toggle("hidden");
  });
};

const closeMenu = (menuWrapper, button) => {
  $(document).on("click", function (e) {
    if (!$(e.target).closest(menuWrapper).length) {
      $(menuWrapper).removeClass("active");
    }
  });

  $(button).on("click", function () {
    $(menuWrapper).removeClass("active");
  });
};
function setupSelectMenu(
  menuButtonSelector,
  menuOptionsSelector,
  iconContainerSelector,
  defaultValue = "dark"
) {
  const menuButton = $(menuButtonSelector);
  const menuOptions = $(menuOptionsSelector);
  const iconContainer = $(iconContainerSelector);

  // Hàm để chọn một option
  function selectOption(option) {
    const selectedValue = option.data("value");
    const selectedIcon = option.find("svg").clone();

    // Cập nhật SVG trong icon container
    iconContainer.empty().append(selectedIcon);

    // Đánh dấu option đã được chọn
    menuOptions.removeClass("selected");
    option.addClass("selected");

    // Cập nhật lớp trên thẻ body
    // if (selectedValue === "dark") {
    //   $("body")
    //     .removeClass("bg-white text-black")
    //     .addClass("bg-black text-gray-400");
    // } else if (selectedValue === "light") {
    //   $("body")
    //     .removeClass("bg-black text-gray-400")
    //     .addClass("bg-white text-black");
    // } else {
    //   // Trường hợp "system" hoặc các tùy chọn khác (tùy chọn hệ thống)
    //   $("body").removeClass("bg-black bg-white text-black text-gray-400");
    // }

    console.log("Giá trị đã chọn: " + selectedValue);
  }

  // Chọn tùy chọn mặc định
  const defaultOption = menuOptions.filter(`[data-value="${defaultValue}"]`);
  if (defaultOption.length) {
    selectOption(defaultOption);
  }

  // Sự kiện mở/đóng menu khi nhấn vào nút menu
  menuButton.on("click", function (event) {
    event.stopPropagation();
    menuButton.next().toggleClass("hidden");
  });

  // Sự kiện khi click vào từng option
  menuOptions.on("click", function () {
    selectOption($(this));
    menuButton.next().addClass("hidden");
  });

  // Đóng menu khi click ra ngoài
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(menuButton).length &&
      !$(event.target).closest(menuButton.next()).length
    ) {
      menuButton.next().addClass("hidden");
    }
  });
}

function handleTabSwitch(buttonGroupId, contentWrapId, activeClass = "active") {
  const buttons = document.querySelectorAll(`#${buttonGroupId} .tab-btn`);
  const contents = document.querySelectorAll(`#${contentWrapId} .tab-content`);

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = button.getAttribute("data-tab");

      // Cập nhật trạng thái nút
      buttons.forEach((btn) => btn.classList.remove(activeClass));
      button.classList.add(activeClass);

      // Cập nhật nội dung hiển thị
      contents.forEach((content) => {
        if (content.getAttribute("data-tab") === targetTab) {
          content.classList.remove("hidden");
        } else {
          content.classList.add("hidden");
        }
      });
    });
  });
}

// Gọi hàm cho menu chế độ tối/sáng với tùy chọn mặc định là `dark`
$(document).ready(function () {
  setupSelectMenu(
    "#btn-dark-mode",
    ".dark-mode-menu-item",
    ".dark-mode",
    "dark"
  );
  createScrollSlider("#carousel-slider", "#btn-prev", "#btn-next");
  createScrollSlider(
    "#carousel-outstanding",
    "#btn-prev-outstanding",
    "#btn-next-outstanding"
  );
  createScrollSlider(
    "#carousel-movie-single",
    "#btn-prev-movie-single",
    "#btn-next-movie-single"
  );
  createScrollSlider(
    "#carousel-movie-theater",
    "#btn-prev-movie-theater",
    "#btn-next-movie-theater"
  );
  createScrollSlider(
    "#carousel-tv-series",
    "#btn-prev-tv-series",
    "#btn-next-tv-series"
  );
  createScrollSlider(
    "#carousel-animation",
    "#btn-prev-animation",
    "#btn-next-animation"
  );

  searchToggle();
});

const communityToggle = () => {
  toggleMenu("#community-btn", "#community-content");
  closeMenu("#community-content", "#close-menu-btn");
};
const searchToggle = () => {
  toggleMenu("#search-btn", "#search-content");
  closeMenu("#search-content");
};
const toggleMenuNav = () => {
  toggleMenu("#bugger-menu", "#menunav");
  closeMenu("#menunav");
};

$(document).ready(function () {
  const hamburgerBtn = $("#hamburgerBtn");
  const mobileMenu = $("#mobileMenu");
  const overlay = $("#overlay");

  let isDragging = false;
  let startY;
  let initialTransformY = 0; // Biến lưu vị trí ban đầu của mobileMenu

  // Hàm mở menu và ngăn thao tác bên ngoài menu
  function toggleMenu() {
    mobileMenu.toggleClass("translate-y-0"); // Hiện menu
    mobileMenu.toggleClass("translate-y-full"); // Ẩn menu
    overlay.toggleClass("hidden"); // Toggle lớp nền mờ
    $("body").toggleClass("overflow-y-hidden"); // Ngăn cuộn
  }

  // Đóng menu khi nhấn vào nền mờ
  overlay.on("click", toggleMenu);

  // Bật/tắt menu khi nhấn nút hamburger
  hamburgerBtn.on("click", toggleMenu);

  // Bắt đầu kéo khi bắt đầu chạm hoặc nhấn chuột
  // mobileMenu.on("mousedown touchstart", (e) => {
  //   isDragging = true;
  //   startY = e.touches ? e.touches[0].clientY : e.clientY; // Lấy vị trí Y của chạm hoặc nhấn chuột

  //   // Lưu vị trí hiện tại
  //   const computedStyle = window.getComputedStyle(mobileMenu[0]);
  //   const transform = computedStyle.transform;

  //   if (transform !== "none") {
  //     const matrix = transform.match(/matrix.*\((.+)\)/);
  //     initialTransformY = matrix ? parseFloat(matrix[1].split(", ")[5]) : 0;
  //   } else {
  //     initialTransformY = 0;
  //   }
  // });

  // // Di chuyển ngón tay hoặc chuột để kéo
  // $(document).on("mousemove touchmove", (e) => {
  //   if (isDragging) {
  //     const distance = (e.touches ? e.touches[0].clientY : e.clientY) - startY;

  //     // Cập nhật vị trí của mobileMenu khi kéo
  //     mobileMenu.css(
  //       "transform",
  //       `translateY(${initialTransformY + distance}px)`
  //     );
  //   }
  // });

  // // Dừng kéo khi kết thúc chạm hoặc nhả chuột
  // $(document).on("mouseup touchend", (e) => {
  //   isDragging = false;

  //   // Tính toán khoảng cách
  //   const distance =
  //     (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - startY;

  //   // Nếu kéo xuống nhiều hơn một khoảng cách nhất định, đóng menu
  //   if (distance > 100) {
  //     // Điều chỉnh khoảng cách theo nhu cầu
  //     toggleMenu();
  //   } else {
  //     // Trả mobileMenu về vị trí ban đầu nếu không đủ khoảng cách
  //     mobileMenu.css("transform", `translateY(${initialTransformY}px)`);
  //   }
  // });
});

$(document).ready(function () {
  let selectedTab = null;
  let hideTimeout;

  $(".tab-button").on("mouseenter", function () {
    clearTimeout(hideTimeout); // Hủy bỏ bộ đếm thời gian đóng nếu di chuột vào
    const tab = $(this).data("tab");

    if (tab !== selectedTab) {
      selectedTab = tab;

      $(".tab-button svg").removeClass("rotate-180"); // Xóa hiệu ứng xoay icon của tất cả các tab
      $(this).find("svg").addClass("rotate-180"); // Xoay icon của tab đang chọn

      // Ẩn tab-items hiện tại với fade-out

      const newContent = getContentForTab(tab);
      $("#tab-content").html(newContent);

      const direction = getDirection(tab);

      // Cấu hình vị trí ban đầu của tab-items
      $("#tab-content .tab-items").css({
        opacity: 0,
        position: "relative",
        left: direction === "left" ? "100px" : "-100px",
      });

      // Thực hiện hiệu ứng trượt cho .tab-items
      $("#tab-content .tab-items").animate(
        {
          opacity: 1,
          left: 0,
        },
        300
      );
      $("#tab-content").show();
      // Hiển thị #tab-content trước khi hiệu ứng
    }
  });

  $(".tab-button, #tab-content").on("mouseleave", function () {
    hideTimeout = setTimeout(function () {
      selectedTab = null;
      $("#tab-content").fadeOut(300);
      // Xóa xoay icon khi đóng tab
      $(".tab-button svg").removeClass("rotate-180");
    }, 300);
  });

  // Khi di chuột vào lại, hủy độ trễ đóng tab-content
  $("#tab-content").on("mouseenter", function () {
    clearTimeout(hideTimeout);
  });

  function getContentForTab(tab) {
    if (tab === "tab1") {
      return `
      <div class="tab-items">
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
      </div>`;
    } else if (tab === "tab2") {
      return `
      <div class="tab-items">
        <a href="#" >Quốc gia 1</a>
        <a href="#" >Quốc gia 2</a>
        <a href="#" >Quốc gia 1</a>
        <a href="#" >Quốc gia 2</a>
        <a href="#" >Quốc gia 1</a>
        <a href="#" >Quốc gia 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
        <a href="#" >Thể loại 1</a>
        <a href="#" >Thể loại 2</a>
      </div>`;
    }
    return "";
  }

  function getDirection(tab) {
    return tab === "tab1" ? "left" : "right";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const darkModeMenuItems = document.querySelectorAll(".dark-mode-menu-item");

  darkModeMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const mode = item.getAttribute("data-value");
      switchTheme(mode);
    });
  });

  function switchTheme(mode) {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (mode === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (mode === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.removeAttribute("class");
      document.documentElement.classList.toggle("dark", systemPrefersDark);
      localStorage.setItem("theme", "system");
    }
  }

  // Kiểm tra và áp dụng theme khi tải trang
  function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      switchTheme(savedTheme);
    }
  }

  applySavedTheme();
});
