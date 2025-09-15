export default async function CabinsPage() {
  const url = 'https://jsonplaceholder.typicode.com/users'

  const response = await fetch(url)
  const data = await response.json()

  return (
    <div>
      <h1>Cabins Page</h1>
      <br />
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
