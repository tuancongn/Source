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
    const errorEl = document.getElementById('auth-error');
    if(errorEl) errorEl.classList.add('hidden');
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
    if(errorMsg) errorMsg.classList.add('hidden');

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

// --- FIX: PRICING TOGGLE LOGIC ---
// Đoạn code này sẽ chạy khi trang web tải xong
// --- FIXED: PRICING TOGGLE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const btnMonthly = document.getElementById('btn-monthly');
    const btnYearly = document.getElementById('btn-yearly');
    const priceStandard = document.getElementById('price-standard');
    const pricePremium = document.getElementById('price-premium');
    const priceStandardUnit = priceStandard ? priceStandard.nextElementSibling : null;
    const pricePremiumUnit = pricePremium ? pricePremium.nextElementSibling : null;

    // Kiểm tra đầy đủ tất cả các element cần thiết
    if (!btnMonthly || !btnYearly || !priceStandard || !pricePremium || !priceStandardUnit || !pricePremiumUnit) {
        console.warn('Missing pricing elements in DOM');
        return;
    }

    // Hàm cập nhật giao diện Monthly
    function setMonthlyPricing() {
        // Cập nhật button active state
        btnMonthly.classList.add('bg-trade-accent', 'text-white', 'shadow-sm');
        btnMonthly.classList.remove('text-slate-400');
        
        btnYearly.classList.remove('bg-trade-accent', 'text-white', 'shadow-sm');
        btnYearly.classList.add('text-slate-400');

        // Cập nhật giá
        priceStandard.innerText = '₫990k';
        pricePremium.innerText = '₫2.5tr';
        
        // Cập nhật đơn vị thời gian
        priceStandardUnit.innerText = '/tháng';
        priceStandardUnit.classList.remove('text-trade-accent');
        priceStandardUnit.classList.add('text-slate-500');
        
        pricePremiumUnit.innerText = '/tháng';
        pricePremiumUnit.classList.remove('text-trade-accent');
        pricePremiumUnit.classList.add('text-slate-400');
    }

    // Hàm cập nhật giao diện Yearly
    function setYearlyPricing() {
        // Cập nhật button active state
        btnYearly.classList.add('bg-trade-accent', 'text-white', 'shadow-sm');
        btnYearly.classList.remove('text-slate-400');
        
        btnMonthly.classList.remove('bg-trade-accent', 'text-white', 'shadow-sm');
        btnMonthly.classList.add('text-slate-400');

        // Cập nhật giá (giảm 20%)
        priceStandard.innerText = '₫790k';
        pricePremium.innerText = '₫2.0tr';
        
        // Cập nhật đơn vị thời gian và màu sắc
        priceStandardUnit.innerText = '/năm';
        priceStandardUnit.classList.remove('text-slate-500');
        priceStandardUnit.classList.add('text-trade-accent');
        
        pricePremiumUnit.innerText = '/năm';
        pricePremiumUnit.classList.remove('text-slate-400');
        pricePremiumUnit.classList.add('text-trade-accent');
    }

    // Gắn sự kiện click
    btnMonthly.addEventListener('click', (e) => {
        e.preventDefault();
        setMonthlyPricing();
    });

    btnYearly.addEventListener('click', (e) => {
        e.preventDefault();
        setYearlyPricing();
    });

    // Thiết lập trạng thái ban đầu (Monthly)
    setMonthlyPricing();
});
