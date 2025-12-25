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

// Pricing Toggle Logic - ENHANCED VERSION with Sliding Effect
document.addEventListener('DOMContentLoaded', () => {
    // 1. Gather all elements
    const pricingToggles = {
        btnMonthly: document.getElementById('btn-monthly'),
        btnYearly: document.getElementById('btn-yearly'),
        slidingBg: document.getElementById('sliding-bg'),
        priceStandard: document.getElementById('price-standard'),
        pricePremium: document.getElementById('price-premium'),
        yearlyBadge: document.getElementById('yearly-badge')
    };

    // 2. Check if all required elements exist
    if (!Object.values(pricingToggles).every(el => el)) {
        console.warn('Pricing toggle: Một số phần tử không tìm thấy.');
        return;
    }

    // 3. State
    let isYearlyMode = false;

    // 4. Core function to update the UI
    const updatePricingDisplay = () => {
        // --- A. Update Sliding Background & Button Styles ---
        const buttonWidth = pricingToggles.btnMonthly.offsetWidth;
        if (isYearlyMode) {
            // Move background to "Hàng Năm"
            pricingToggles.slidingBg.style.transform = `translateX(${buttonWidth + 4}px)`; // +4px for gap
            // Update button classes
            pricingToggles.btnYearly.classList.add('active');
            pricingToggles.btnMonthly.classList.remove('active');
            // Update badge color when active
            pricingToggles.yearlyBadge.classList.remove('from-amber-500', 'to-amber-300', 'text-slate-900');
            pricingToggles.yearlyBadge.classList.add('from-slate-100', 'to-slate-300', 'text-slate-900');
        } else {
            // Move background to "Hàng Tháng"
            pricingToggles.slidingBg.style.transform = 'translateX(0px)';
            // Update button classes
            pricingToggles.btnMonthly.classList.add('active');
            pricingToggles.btnYearly.classList.remove('active');
            // Reset badge color
            pricingToggles.yearlyBadge.classList.add('from-amber-500', 'to-amber-300', 'text-slate-900');
            pricingToggles.yearlyBadge.classList.remove('from-slate-100', 'to-slate-300');
        }

        // --- B. Update Prices with Enhanced Animation ---
        const newStandardPrice = isYearlyMode ? '₫790k' : '₫990k';
        const newPremiumPrice = isYearlyMode ? '₫2.0tr' : '₫2.5tr';

        // Function to animate price change
        const animatePriceChange = (priceElement, newValue) => {
            if (priceElement.textContent !== newValue) {
                // 1. Fade out and slide up slightly
                priceElement.style.opacity = '0.5';
                priceElement.style.transform = 'translateY(-6px)';
                
                setTimeout(() => {
                    // 2. Change the text
                    priceElement.textContent = newValue;
                    // 3. Apply the pop animation and reset opacity/transform
                    priceElement.classList.remove('price-changing');
                    void priceElement.offsetWidth; // Trigger reflow to restart animation
                    priceElement.classList.add('price-changing');
                    
                    priceElement.style.opacity = '';
                    priceElement.style.transform = '';
                    
                    // 4. Remove animation class after it finishes
                    setTimeout(() => {
                        priceElement.classList.remove('price-changing');
                    }, 400);
                }, 150); // Matches the CSS transition duration
            }
        };

        // Apply animation to both prices
        animatePriceChange(pricingToggles.priceStandard, newStandardPrice);
        animatePriceChange(pricingToggles.pricePremium, newPremiumPrice);
    };

    // 5. Attach click events
    pricingToggles.btnMonthly.addEventListener('click', () => {
        if (isYearlyMode) {
            isYearlyMode = false;
            updatePricingDisplay();
        }
    });

    pricingToggles.btnYearly.addEventListener('click', () => {
        if (!isYearlyMode) {
            isYearlyMode = true;
            updatePricingDisplay();
        }
    });

    // 6. Initialize - Set initial state to Monthly
    updatePricingDisplay(); // This will set 'Hàng Tháng' as active
});
    updatePricingDisplay();
});


