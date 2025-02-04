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
    return response.json();
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
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
