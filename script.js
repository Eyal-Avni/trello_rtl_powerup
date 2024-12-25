const t = TrelloPowerUp.iframe();

// Add capabilities to your Power-Up
window.TrelloPowerUp.initialize({
  "card-back-section": function (t, options) {
    return {
      title: "Fix RTL Text",
      icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png", // Generic free icon
      content: {
        type: "iframe",
        url: t.signUrl("https://eyal-avni.github.io/trello_rtl_powerup/rtl-editor"), // Updated with GitHub Pages URL
        height: 150
      }
    };
  },

  "card-buttons": function (t, options) {
    return [
      {
        text: "Apply RTL Fix",
        callback: async function (t) {
          const card = await t.card("name", "desc");
          const fixedDesc = `<div style='direction: rtl; text-align: right;'>${card.desc}</div>`;

          return t.set("card", "shared", "description", fixedDesc).then(() => {
            alert("RTL fix applied to the card description!");
          });
        },
      },
    ];
  },

  "authorization-status": function (t) {
    return { authorized: true };
  }
});

// Attach CSS styles for your Power-Up
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
    .rtl-text {
      direction: rtl;
      text-align: right;
    }
  `;
  document.head.appendChild(style);
});
