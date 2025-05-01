import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan." });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data pengguna yang ter-decode ke dalam request
    next(); // Lanjutkan ke middleware atau handler berikutnya
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid." });
  }
};

export default authMiddleware;
