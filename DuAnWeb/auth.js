// Import Firebase Functions (Authentication + Firestore)
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

// Import Firestore (Database)
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

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

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app); // Database
const provider = new GoogleAuthProvider();

// --- 2. DATABASE HELPER FUNCTIONS ---

/**
 * Hàm này sẽ lưu thông tin user vào Firestore Database
 * - Nếu user mới: Tạo bản ghi mới.
 * - Nếu user cũ: Cập nhật thời gian đăng nhập cuối.
 */
async function saveUserToFirestore(user) {
    const userRef = doc(db, "users", user.uid); // Tạo tham chiếu đến bảng 'users' với ID là UID của user
    
    try {
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // Trường hợp 1: User mới chưa có trong Database -> Tạo mới
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || user.email.split('@')[0], // Lấy tên hoặc cắt email làm tên
                photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=10b981&color=fff`,
                plan: "Free", // Mặc định gói Free
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
            });
            console.log("Đã tạo hồ sơ user mới trong Firestore");
        } else {
            // Trường hợp 2: User đã tồn tại -> Chỉ cập nhật ngày đăng nhập cuối
            await setDoc(userRef, {
                lastLogin: serverTimestamp()
            }, { merge: true }); // merge: true để không ghi đè mất dữ liệu cũ
            console.log("Đã cập nhật thời gian đăng nhập");
        }
    } catch (error) {
        console.error("Lỗi khi lưu Database:", error);
    }
}

// --- 3. AUTHENTICATION LOGIC ---

// Handle Google Login
const btnGoogle = document.getElementById('btn-google-login');
if(btnGoogle) {
    btnGoogle.addEventListener('click', async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // LƯU USER VÀO DB
            await saveUserToFirestore(user);
            
            console.log("Logged in with Google:", user.displayName);
            if (typeof closeModal === 'function') closeModal();
            
        } catch (error) {
            handleAuthError(error);
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
        const isRegister = document.getElementById('modal-title').innerText.includes("Tạo");
        let userCredential;

        if (isRegister) {
            // Sign Up
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Cập nhật tên hiển thị
            await updateProfile(userCredential.user, {
                displayName: email.split('@')[0]
            });
            console.log("Registered:", userCredential.user.email);
        } else {
            // Sign In
            userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged In:", userCredential.user.email);
        }
        
        // LƯU USER VÀO DB (Cho cả đăng ký và đăng nhập)
        if (userCredential && userCredential.user) {
            await saveUserToFirestore(userCredential.user);
        }

        if (typeof closeModal === 'function') closeModal();
        
    } catch (error) {
        handleAuthError(error);
    } finally {
        spinner.classList.add('hidden');
    }
};

// --- 4. ERROR HANDLING ---

function handleAuthError(error) {
    console.error("Auth Error Code:", error.code);
    
    let message = "Có lỗi xảy ra.";
    
    // Xử lý lỗi Popup (Người dùng tự tắt)
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        console.warn("Người dùng đã đóng popup đăng nhập.");
        return; // Không hiện lỗi đỏ lên màn hình, chỉ return
    }

    if (error.code === 'auth/email-already-in-use') message = "Email này đã được đăng ký.";
    if (error.code === 'auth/wrong-password') message = "Mật khẩu không đúng.";
    if (error.code === 'auth/user-not-found') message = "Tài khoản không tồn tại.";
    if (error.code === 'auth/weak-password') message = "Mật khẩu phải có ít nhất 6 ký tự.";
    if (error.code === 'auth/invalid-email') message = "Email không hợp lệ.";
    
    showError(message);
}

// --- 5. UI STATE MANAGEMENT ---

// Listen for Auth State Changes (Login/Logout)
onAuthStateChanged(auth, async (user) => {
    const authContainer = document.getElementById('auth-container'); 
    const userMenu = document.getElementById('user-menu'); 
    const mobileAuth = document.getElementById('mobile-auth-section');
    const mobileUser = document.getElementById('mobile-user-section');

    if (user) {
        // User is signed in.
        // Có thể lấy thêm thông tin từ Firestore nếu muốn hiển thị chi tiết (ví dụ: Plan Premium)
        // const userSnap = await getDoc(doc(db, "users", user.uid));
        // const userData = userSnap.data();

        // Desktop UI Update
        if(authContainer) document.getElementById('btn-login-nav').classList.add('hidden');
        
        if(userMenu) {
            userMenu.classList.remove('hidden');
            document.getElementById('user-email').innerText = user.displayName || user.email;
            
            if(user.photoURL) {
                document.getElementById('user-avatar').src = user.photoURL;
            } else {
                document.getElementById('user-avatar').src = `https://ui-avatars.com/api/?name=${user.email}&background=10b981&color=fff`;
            }
        }

        // Mobile UI Update
        if(mobileAuth) mobileAuth.classList.add('hidden');
        if(mobileUser) {
            mobileUser.classList.remove('hidden');
            document.getElementById('mobile-user-email').innerText = user.displayName || user.email;
        }

    } else {
        // User is signed out.
        if(authContainer) document.getElementById('btn-login-nav').classList.remove('hidden');
        if(userMenu) userMenu.classList.add('hidden');

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
        // window.location.reload(); // Có thể bỏ comment dòng này nếu muốn refresh trang
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
