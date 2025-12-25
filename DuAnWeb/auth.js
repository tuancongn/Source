// Import Firebase Functions from CDN (Modular V11/V9 compatible)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// --- 1. CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyAa_eTNPdNkkJKsOxvN2e87-Kod9I6csNA",
    authDomain: "ai-trade-master-19330.firebaseapp.com",
    projectId: "ai-trade-master-19330",
    storageBucket: "ai-trade-master-19330.firebasestorage.app",
    messagingSenderId: "404823240934",
    appId: "1:404823240934:web:419b111ec0fa4646454b27",
    measurementId: "G-ML3YBSG9DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- 2. AUTHENTICATION LOGIC ---

// Handle Google Login
const btnGoogle = document.getElementById('btn-google-login');
if(btnGoogle) {
    btnGoogle.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Logged in with Google:", user.displayName);
            closeModal(); // Hàm này ở trong ui.js, ta sẽ gọi được vì nó global
        } catch (error) {
            showError(error.message);
        }
    });
}

// Handle Email/Password Auth (Form Submit)
window.handleAuth = async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const spinner = document.getElementById('loading-spinner');
    
    // UI Loading state
    spinner.classList.remove('hidden');
    
    try {
        // Kiểm tra biến toàn cục isRegisterMode từ ui.js (chúng ta cần truy cập nó)
        // Lưu ý: Biến let ở file ui.js không tự động global nếu không gán vào window.
        // Cách fix: Kiểm tra text của nút bấm để biết đang là Login hay Register
        const isRegister = document.getElementById('modal-title').innerText.includes("Tạo");

        if (isRegister) {
            // Sign Up
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Mặc định tạo tên user từ email (phần trước @)
            await updateProfile(userCredential.user, {
                displayName: email.split('@')[0]
            });
            console.log("Registered:", userCredential.user.email);
        } else {
            // Sign In
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged In:", userCredential.user.email);
        }
        
        // Thành công thì đóng modal
        if (typeof closeModal === 'function') {
            closeModal();
        }
        
    } catch (error) {
        console.error("Auth Error:", error);
        let message = "Có lỗi xảy ra.";
        if (error.code === 'auth/email-already-in-use') message = "Email này đã được đăng ký.";
        if (error.code === 'auth/wrong-password') message = "Mật khẩu không đúng.";
        if (error.code === 'auth/user-not-found') message = "Tài khoản không tồn tại.";
        if (error.code === 'auth/weak-password') message = "Mật khẩu phải có ít nhất 6 ký tự.";
        if (error.code === 'auth/invalid-email') message = "Email không hợp lệ.";
        
        showError(message);
    } finally {
        spinner.classList.add('hidden');
    }
};

// --- 3. UI STATE MANAGEMENT ---

// Listen for Auth State Changes (Login/Logout)
onAuthStateChanged(auth, (user) => {
    const authContainer = document.getElementById('auth-container'); // Nút Đăng nhập/Dùng thử trên Nav
    const userMenu = document.getElementById('user-menu'); // Menu Avatar
    const mobileAuth = document.getElementById('mobile-auth-section');
    const mobileUser = document.getElementById('mobile-user-section');

    if (user) {
        // User is signed in.
        console.log("User active:", user.email);

        // Desktop UI Update
        if(authContainer) {
            // Ẩn nút đăng nhập, hiện nút dùng thử hoặc ẩn cả container tùy ý
            document.getElementById('btn-login-nav').classList.add('hidden');
        }
        if(userMenu) {
            userMenu.classList.remove('hidden');
            document.getElementById('user-email').innerText = user.displayName || user.email;
            if(user.photoURL) {
                document.getElementById('user-avatar').src = user.photoURL;
            } else {
                // Avatar mặc định nếu login bằng email
                document.getElementById('user-avatar').src = `https://ui-avatars.com/api/?name=${user.email}&background=10b981&color=fff`;
            }
        }

        // Mobile UI Update
        if(mobileAuth) mobileAuth.classList.add('hidden');
        if(mobileUser) {
            mobileUser.classList.remove('hidden');
            document.getElementById('mobile-user-email').innerText = user.email;
        }

    } else {
        // User is signed out.
        console.log("No user");

        // Reset Desktop UI
        if(authContainer) {
            document.getElementById('btn-login-nav').classList.remove('hidden');
        }
        if(userMenu) userMenu.classList.add('hidden');

        // Reset Mobile UI
        if(mobileAuth) mobileAuth.classList.remove('hidden');
        if(mobileUser) mobileUser.classList.add('hidden');
    }
});

// Handle Logout
const btnLogout = document.getElementById('btn-logout');
const btnLogoutMobile = document.getElementById('btn-logout-mobile');

async function handleLogout() {
    try {
        await signOut(auth);
        console.log("User signed out");
        // Optional: Reload page or redirect
        // window.location.reload();
    } catch (error) {
        console.error("Logout error", error);
    }
}

if(btnLogout) btnLogout.addEventListener('click', handleLogout);
if(btnLogoutMobile) btnLogoutMobile.addEventListener('click', handleLogout);

// Helper function to show errors in Modal
function showError(msg) {
    const el = document.getElementById('auth-error');
    if(el) {
        el.innerText = msg;
        el.classList.remove('hidden');
    }
}