import Riwayat from "../models/Riwayat.mjs";

const getAllRiwayat = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const riwayat = await Riwayat.find().skip(skip).limit(limit);

    const total = await Riwayat.countDocuments();

    res.status(200).json({
      data: riwayat,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRiwayatByYearMonth = async (req, res) => {
  try {
    let { year, month } = req.params;

    // Pastikan year dan month dalam bentuk string
    year = String(year);
    month = String(month).padStart(2, "0");
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const riwayat = await Riwayat.find({ year, month }).skip(skip).limit(limit);
    const total = await Riwayat.countDocuments({ year, month });

    res.status(200).json({
      data: riwayat,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllRiwayat, getRiwayatByYearMonth };
