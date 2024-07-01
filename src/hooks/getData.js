export async function getData({ count }) {
  try {
    const response = await fetch(
      `https://bhagavadgitaapi.in/chapter/${count}/`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error occurred while fetching the data:", error);
    throw error;
  }
}

export default getData;
