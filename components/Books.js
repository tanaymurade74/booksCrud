import useFetch from "../useFetch"
const Books = () => {
  const{data, loading, error} = useFetch("http://localhost:3000/books");
  console.log(data)

}
export default Books;