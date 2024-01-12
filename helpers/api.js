async function getTotalPagesFromAPI() {
    const URL = "https://jsonplaceholder.typicode.com/todos";
    const response = await fetch(URL);
    const data = await response.json();
    const totalPosts = data.length;
    return Math.ceil(totalPosts / 10); // Suponiendo 10 posts por página
  }
  
  async function getPostsFromAPI(page) {
    const itemsPerPage = 10;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    
    const URL = `https://jsonplaceholder.typicode.com/todos?_start=${start}&_end=${end}`;
    const response = await fetch(URL);
    const data = await response.json();
    
    return data;
  }
  
  export { getTotalPagesFromAPI, getPostsFromAPI };