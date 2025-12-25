// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('block');
    } else {
        menu.classList.remove('block');
        menu.classList.add('hidden');
    }
}

// Modal Control
function openModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function closeModal() {
    document.getElementById('auth-modal').classList.add('hidden');
    document.body.classList.remove('modal-open');
    // Reset error messages when closing
    document.getElementById('auth-error').classList.add('hidden');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    }
});

// Toggle between Login and Register in Modal
let isRegisterMode = false;

function switchAuthMode() {
    isRegisterMode = !isRegisterMode;
    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    const submitBtn = document.getElementById('btn-submit-auth').querySelector('span');
    const switchText = document.getElementById('switch-text');
    const switchBtn = document.getElementById('btn-switch-mode');
    const errorMsg = document.getElementById('auth-error');

    // Hide error when switching
    errorMsg.classList.add('hidden');

    if (isRegisterMode) {
        title.innerText = "Tạo Tài Khoản";
        subtitle.innerText = "Bắt đầu hành trình giao dịch ngay hôm nay";
        submitBtn.innerText = "Đăng Ký";
        switchText.innerText = "Đã có tài khoản?";
        switchBtn.innerText = "Đăng nhập ngay";
    } else {
        title.innerText = "Đăng Nhập";
        subtitle.innerText = "Chào mừng quay trở lại AI Trade Master";
        submitBtn.innerText = "Đăng Nhập";
        switchText.innerText = "Chưa có tài khoản?";
        switchBtn.innerText = "Đăng ký ngay";
    }
}

// Pricing Toggle Logic - IMPROVED VERSION
document.addEventListener('DOMContentLoaded', () => {
    const pricingToggles = {
        btnMonthly: document.getElementById('btn-monthly'),
        btnYearly: document.getElementById('btn-yearly'),
        priceStandard: document.getElementById('price-standard'),
        pricePremium: document.getElementById('price-premium'),
        // Thêm các element cần thay đổi khác vào đây
    };

    // Kiểm tra tất cả phần tử có tồn tại không
    const isAllElementsExist = Object.values(pricingToggles).every(el => el !== null);
    if (!isAllElementsExist) {
        console.warn('Một hoặc nhiều phần tử pricing không tồn tại. Kiểm tra ID trong HTML.');
        return;
    }

    // Trạng thái hiện tại: true = "Hàng Năm", false = "Hàng Tháng"
    let isYearlyMode = false;

    // Hàm chính để cập nhật giao diện
    const updatePricingDisplay = () => {
        // 1. Cập nhật trạng thái nút (mượt mà với transition CSS)
        if (isYearlyMode) {
            pricingToggles.btnYearly.classList.add('bg-trade-accent', 'text-white', 'shadow-sm');
            pricingToggles.btnYearly.classList.remove('text-slate-400');
            
            pricingToggles.btnMonthly.classList.remove('bg-trade-accent', 'text-white', 'shadow-sm');
            pricingToggles.btnMonthly.classList.add('text-slate-400');
        } else {
            pricingToggles.btnMonthly.classList.add('bg-trade-accent', 'text-white', 'shadow-sm');
            pricingToggles.btnMonthly.classList.remove('text-slate-400');
            
            pricingToggles.btnYearly.classList.remove('bg-trade-accent', 'text-white', 'shadow-sm');
            pricingToggles.btnYearly.classList.add('text-slate-400');
        }

        // 2. Cập nhật giá với hiệu ứng fade (nếu muốn)
        const standardPrice = isYearlyMode ? '₫790k' : '₫990k';
        const premiumPrice = isYearlyMode ? '₫2.0tr' : '₫2.5tr';
        
        // Thêm hiệu ứng thay đổi nhẹ
        if (pricingToggles.priceStandard.textContent !== standardPrice) {
            pricingToggles.priceStandard.style.opacity = '0.7';
            pricingToggles.priceStandard.style.transform = 'translateY(2px)';
            setTimeout(() => {
                pricingToggles.priceStandard.textContent = standardPrice;
                pricingToggles.priceStandard.style.opacity = '';
                pricingToggles.priceStandard.style.transform = '';
            }, 150);
        }
        
        if (pricingToggles.pricePremium.textContent !== premiumPrice) {
            pricingToggles.pricePremium.style.opacity = '0.7';
            pricingToggles.pricePremium.style.transform = 'translateY(2px)';
            setTimeout(() => {
                pricingToggles.pricePremium.textContent = premiumPrice;
                pricingToggles.pricePremium.style.opacity = '';
                pricingToggles.pricePremium.style.transform = '';
            }, 150);
        }

        // 3. (TÙY CHỌN) Cập nhật text nhỏ bên cạnh giá
        const periodText = isYearlyMode ? '/tháng (thanh toán hàng năm)' : '/tháng';
        // Nếu có element hiển thị kỳ hạn, cập nhật nó ở đây
    };

    // Gắn sự kiện
    pricingToggles.btnMonthly.addEventListener('click', () => {
        if (!isYearlyMode) return; // Đã ở chế độ tháng, không làm gì
        isYearlyMode = false;
        updatePricingDisplay();
    });

    pricingToggles.btnYearly.addEventListener('click', () => {
        if (isYearlyMode) return; // Đã ở chế độ năm, không làm gì
        isYearlyMode = true;
        updatePricingDisplay();
    });

    // Khởi tạo hiển thị ban đầu
    updatePricingDisplay();
});

