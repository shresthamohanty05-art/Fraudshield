/* =========================================================
   FRAUDSHIELD - DEVICE SECURITY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const blockButton =
        document.getElementById("block-device-btn");

    const reviewButton =
        document.getElementById("review-activity-btn");

    const manageButton =
        document.getElementById("manage-devices-btn");

    const detailButtons =
        document.querySelectorAll(".device-details-btn");


    /* =========================================================
       BLOCK DEVICE
       ========================================================= */

    if (blockButton) {

        blockButton.addEventListener("click", () => {

            const confirmed = confirm(
                "Are you sure you want to block Vivo V29?"
            );

            if (!confirmed) return;

            blockButton.textContent = "Device Blocked";

            blockButton.disabled = true;

            blockButton.style.opacity = "0.65";

            alert(
                "Vivo V29 has been blocked successfully."
            );

        });

    }


    /* =========================================================
       REVIEW ACTIVITY
       ========================================================= */

    if (reviewButton) {

        reviewButton.addEventListener("click", () => {

            const activity =
                document.querySelector(
                    ".recent-device-activity"
                );

            if (!activity) return;

            activity.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    /* =========================================================
       VIEW DEVICE DETAILS
       ========================================================= */

    detailButtons.forEach(button => {

        button.addEventListener("click", () => {

            const deviceName =
                button.dataset.device || "Device";

            showDeviceDetails(deviceName);

        });

    });


    /* =========================================================
       MANAGE ALL DEVICES
       ========================================================= */

    if (manageButton) {

        manageButton.addEventListener("click", () => {

            showManageDevices();

        });

    }


    /* =========================================================
       INITIAL DEVICE COUNTS
       ========================================================= */

    updateDeviceCounts();

});


/* =========================================================
   DEVICE DETAILS
   ========================================================= */

function showDeviceDetails(deviceName) {

    alert(
        `Device Details\n\n` +
        `Device: ${deviceName}\n` +
        `Status: Trusted\n` +
        `Location: Bengaluru, India\n` +
        `Browser: Chrome\n` +
        `IP Status: Verified`
    );

}


/* =========================================================
   MANAGE DEVICES
   ========================================================= */

function showManageDevices() {

    alert(
        "Trusted Devices\n\n" +
        "1. Android Phone - Active 2h ago\n" +
        "2. Windows PC - Active Now"
    );

}


/* =========================================================
   DEVICE COUNTS
   ========================================================= */

function updateDeviceCounts() {

    const trustedCount =
        document.getElementById(
            "trusted-device-count"
        );

    const newCount =
        document.getElementById(
            "new-device-count"
        );

    const suspiciousCount =
        document.getElementById(
            "suspicious-device-count"
        );


    if (trustedCount) {
        trustedCount.textContent = "2";
    }

    if (newCount) {
        newCount.textContent = "1";
    }

    if (suspiciousCount) {
        suspiciousCount.textContent = "1";
    }

}