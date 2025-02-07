// api.js

const API_BASE_URL = "https://api.green-api.com";

export const sendMessage = async (
  idInstance,
  apiTokenInstance,
  phoneNumber,
  message
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: `${phoneNumber}@c.us`,
          message,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Ошибка при отправке сообщения");
    }

    return result;
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    alert(
      "Возможно, вы пытаетесь отправить сообщения на разные номера. Бесплатный тариф Green API позволяет отправлять сообщения только одному пользователю."
    );
    throw error;
  }
};

export const receiveNotification = async (idInstance, apiTokenInstance) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    );
    return response.json();
  } catch (error) {
    console.error("Ошибка при получении сообщения:", error);
    throw error;
  }
};

export const deleteNotification = async (
  idInstance,
  apiTokenInstance,
  receiptId
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      { method: "DELETE" }
    );
    return response.json();
  } catch (error) {
    console.error("Ошибка при удалении уведомления:", error);
    throw error;
  }
};
