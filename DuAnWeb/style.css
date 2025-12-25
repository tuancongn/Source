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

// Pricing Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const btnMonthly = document.getElementById('btn-monthly');
    const btnYearly = document.getElementById('btn-yearly');
    const priceStandard = document.getElementById('price-standard');
    const pricePremium = document.getElementById('price-premium');

    if(btnMonthly && btnYearly) {
        // Chuyển sang Tháng
        btnMonthly.addEventListener('click', () => {
            // Đổi style nút
            btnMonthly.classList.add('bg-trade-accent', 'text-white', 'shadow-sm');
            btnMonthly.classList.remove('text-slate-400');
            
            btnYearly.classList.remove('bg-trade-accent', 'text-white', 'shadow-sm');
            btnYearly.classList.add('text-slate-400');

            // Cập nhật giá
            if(priceStandard) priceStandard.innerText = '₫990k';
            if(pricePremium) pricePremium.innerText = '₫2.5tr';
        });

        // Chuyển sang Năm (Giảm 20%)
        btnYearly.addEventListener('click', () => {
            // Đổi style nút
            btnYearly.classList.add('bg-trade-accent', 'text-white', 'shadow-sm');
            btnYearly.classList.remove('text-slate-400');
            
            btnMonthly.classList.remove('bg-trade-accent', 'text-white', 'shadow-sm');
            btnMonthly.classList.add('text-slate-400');

            // Cập nhật giá (Giảm ~20%)
            if(priceStandard) priceStandard.innerText = '₫790k'; // 990 * 0.8
            if(pricePremium) pricePremium.innerText = '₫2.0tr'; // 2.5 * 0.8
        });
    }
});
