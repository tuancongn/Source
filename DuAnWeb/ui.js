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

// --- ENHANCED PRICING TOGGLE WITH ANIMATIONS ---
document.addEventListener('DOMContentLoaded', () => {
    const btnMonthly = document.getElementById('btn-monthly');
    const btnYearly = document.getElementById('btn-yearly');
    const pricingIndicator = document.getElementById('pricing-indicator');
    const discountBadge = document.getElementById('discount-badge');
    const priceStandard = document.getElementById('price-standard');
    const pricePremium = document.getElementById('price-premium');
    const priceStandardUnit = document.querySelector('#price-standard + span');
    const pricePremiumUnit = document.querySelector('#price-premium + span');

    if (!btnMonthly || !btnYearly || !pricingIndicator || !priceStandard || !pricePremium) {
        console.warn('Missing pricing elements');
        return;
    }

    // Create glow effect element
    function createGlowEffect(element) {
        const glow = document.createElement('div');
        glow.className = 'pricing-toggle-glow';
        element.appendChild(glow);
        return glow;
    }

    const monthlyGlow = createGlowEffect(btnMonthly);
    const yearlyGlow = createGlowEffect(btnYearly);

    // Animation helper function
    function animateElement(element, animationClass, duration = 300) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    }

    // Update price display with animation
    function updatePriceWithAnimation(element, newValue) {
        element.classList.add('price-change');
        setTimeout(() => {
            element.innerText = newValue;
            setTimeout(() => {
                element.classList.remove('price-change');
            }, 100);
        }, 150);
    }

    // Update unit text with animation
    function updateUnitWithAnimation(element, newUnit) {
        element.classList.add('unit-highlight');
        setTimeout(() => {
            element.innerText = newUnit;
            setTimeout(() => {
                element.classList.remove('unit-highlight');
            }, 300);
        }, 150);
    }

    // Set monthly pricing with animations
    function setMonthlyPricing() {
        // Move indicator to monthly
        pricingIndicator.style.transform = 'translateX(0)';
        
        // Glow effect
        monthlyGlow.classList.add('button-glow-active');
        yearlyGlow.classList.remove('button-glow-active');
        
        // Update button text colors
        btnMonthly.querySelector('span').style.color = 'white';
        btnYearly.querySelector('span').style.color = '#94a3b8';
        
        // Update discount badge visibility
        if (discountBadge) {
            discountBadge.style.opacity = '0.7';
            discountBadge.style.color = '#10b981';
            discountBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
        }
        
        // Animate price changes
        updatePriceWithAnimation(priceStandard, '₫990k');
        updatePriceWithAnimation(pricePremium, '₫2.5tr');
        
        // Update unit text
        if (priceStandardUnit) updateUnitWithAnimation(priceStandardUnit, '/tháng');
        if (pricePremiumUnit) updateUnitWithAnimation(pricePremiumUnit, '/tháng');
        
        // Reset unit colors
        if (priceStandardUnit) priceStandardUnit.classList.remove('text-trade-accent');
        if (pricePremiumUnit) pricePremiumUnit.classList.remove('text-trade-accent');
    }

    // Set yearly pricing with animations
    function setYearlyPricing() {
        // Move indicator to yearly
        pricingIndicator.style.transform = 'translateX(100%)';
        
        // Glow effect
        yearlyGlow.classList.add('button-glow-active');
        monthlyGlow.classList.remove('button-glow-active');
        
        // Update button text colors
        btnMonthly.querySelector('span').style.color = '#94a3b8';
        btnYearly.querySelector('span').style.color = 'white';
        
        // Update discount badge for better visibility
        if (discountBadge) {
            discountBadge.style.opacity = '1';
            discountBadge.style.color = 'white';
            discountBadge.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            discountBadge.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.3)';
        }
        
        // Animate price changes
        updatePriceWithAnimation(priceStandard, '₫790k');
        updatePriceWithAnimation(pricePremium, '₫2.0tr');
        
        // Update unit text
        if (priceStandardUnit) updateUnitWithAnimation(priceStandardUnit, '/năm');
        if (pricePremiumUnit) updateUnitWithAnimation(pricePremiumUnit, '/năm');
        
        // Highlight unit text
        if (priceStandardUnit) priceStandardUnit.classList.add('text-trade-accent');
        if (pricePremiumUnit) pricePremiumUnit.classList.add('text-trade-accent');
    }

    // Event listeners with smooth animations
    btnMonthly.addEventListener('click', (e) => {
        e.preventDefault();
        setMonthlyPricing();
        animateElement(btnMonthly, 'scale-105', 200);
    });

    btnYearly.addEventListener('click', (e) => {
        e.preventDefault();
        setYearlyPricing();
        animateElement(btnYearly, 'scale-105', 200);
    });

    // Initial state (Monthly)
    setMonthlyPricing();

    // Add hover effects for better interactivity
    btnMonthly.addEventListener('mouseenter', () => {
        if (!btnMonthly.classList.contains('active')) {
            monthlyGlow.classList.add('button-glow-active');
        }
    });

    btnMonthly.addEventListener('mouseleave', () => {
        if (!btnMonthly.classList.contains('active')) {
            monthlyGlow.classList.remove('button-glow-active');
        }
    });

    btnYearly.addEventListener('mouseenter', () => {
        if (!btnYearly.classList.contains('active')) {
            yearlyGlow.classList.add('button-glow-active');
        }
    });

    btnYearly.addEventListener('mouseleave', () => {
        if (!btnYearly.classList.contains('active')) {
            yearlyGlow.classList.remove('button-glow-active');
        }
    });
});

