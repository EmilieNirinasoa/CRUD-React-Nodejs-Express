export default function connection() {

    const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'essai',
});
}