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

// Global variable to track mode
let isRegisterMode = false;

// Modal Control
// mode: 'login' hoặc 'register' (mặc định là login nếu không truyền)
function openModal(mode = 'login') {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Reset error when opening
    const errorEl = document.getElementById('auth-error');
    if(errorEl) errorEl.classList.add('hidden');

    // Force switch to specific mode
    if (mode === 'register') {
        isRegisterMode = true;
    } else {
        isRegisterMode = false;
    }
    updateModalUI();
}

function closeModal() {
    document.getElementById('auth-modal').classList.add('hidden');
    document.body.classList.remove('modal-open');
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

// Switch Auth Mode Logic
function switchAuthMode() {
    isRegisterMode = !isRegisterMode;
    updateModalUI();
}

// Update UI Text based on isRegisterMode
function updateModalUI() {
    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    const submitBtn = document.getElementById('btn-submit-auth').querySelector('span');
    const switchText = document.getElementById('switch-text');
    const switchBtn = document.getElementById('btn-switch-mode');
    const errorMsg = document.getElementById('auth-error');

    // Hide error when switching
    if(errorMsg) errorMsg.classList.add('hidden');

    if (isRegisterMode) {
        // Mode: ĐĂNG KÝ
        title.innerText = "Tạo Tài Khoản";
        subtitle.innerText = "Bắt đầu hành trình giao dịch ngay hôm nay";
        submitBtn.innerText = "Đăng Ký";
        
        // Dòng text bên dưới đổi thành gợi ý quay lại đăng nhập
        switchText.innerText = "Đã có tài khoản?";
        switchBtn.innerText = "Đăng nhập ngay";
    } else {
        // Mode: ĐĂNG NHẬP
        title.innerText = "Đăng Nhập";
        subtitle.innerText = "Chào mừng quay trở lại AI Trade Master";
        submitBtn.innerText = "Đăng Nhập";
        
        // Dòng text bên dưới đổi thành gợi ý đi đăng ký
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
        btnMonthly.addEventListener('click', () => {
            btnMonthly.classList.add('bg-trade-accent', 'text-white', 'shadow-sm');
            btnMonthly.classList.remove('text-slate-400');
            btnYearly.classList.remove('bg-trade-accent', 'text-white', 'shadow-sm');
            btnYearly.classList.add('text-slate-400');
            if(priceStandard) priceStandard.innerText = '₫990k';
            if(pricePremium) pricePremium.innerText = '₫2.5tr';
        });

        btnYearly.addEventListener('click', () => {
            btnYearly.classList.add('bg-trade-accent', 'text-white', 'shadow-sm');
            btnYearly.classList.remove('text-slate-400');
            btnMonthly.classList.remove('bg-trade-accent', 'text-white', 'shadow-sm');
            btnMonthly.classList.add('text-slate-400');
            if(priceStandard) priceStandard.innerText = '₫790k'; 
            if(pricePremium) pricePremium.innerText = '₫2.0tr'; 
        });
    }
});
