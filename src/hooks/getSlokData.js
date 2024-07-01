import { useParams } from "react-router";

async function getSlokData({ chapter, slok }) {
  try {
    const response = await fetch(
      `https://bhagavadgitaapi.in/slok/${chapter}/${slok}/`,
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
    console.log(error);
    throw error;
  }
}

export default getSlokData;
