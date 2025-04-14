const Setting = require("../../model/settings/Settings");

exports.updatesetting = async (req, res) => {
    const { stockminlevel, language, darkmode } = req.body;
    const Managerid = req.session.Userid;

    if (!Managerid) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized access - Please login first"
        });
    }

    try {
        const updateData = {};
        
        if (typeof darkmode !== 'undefined') {
            updateData.darkmode = darkmode;
        }
        
        if (stockminlevel) {
            updateData.stockminlevel = parseInt(stockminlevel);
        }
        
        if (language) {
            updateData.language = language;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid settings provided for update"
            });
        }

        const updatedSetting = await Setting.findOneAndUpdate(
            { manager: Managerid },
            updateData,
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            settings: updatedSetting
        });

    } catch (error) {
        console.error("Settings update error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating settings",
            error: error.message
        });
    }
};

exports.getSettings = async (req, res) => {
    const Managerid = req.session.Userid;

    try {
        const settings = await Setting.findOne({ manager: Managerid });
        
        if (!settings) {
            const defaultSettings = new Setting({ manager: Managerid });
            await defaultSettings.save();
            return res.status(200).json({
                success: true,
                settings: defaultSettings
            });
        }

        return res.status(200).json({
            success: true,
            settings
        });
    } catch (error) {
        console.error("Error fetching settings:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch settings"
        });
    }
};