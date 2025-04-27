const apiURL = ''

const users = [
  { username: 'astep1', password: 'astep12345!' },
  { username: 'rovira@ind.uned.es', password: 'APD_1404' },
  { username: 'giannaa@ebos.com.cy', password: 'avgousti55!' },
  { username: 'anna.dmitruk@pwr.edu.pl', password: 'DashAstep2020' },
  { username: 'ruben.abbas@upm.es', password: 'ASTEP25' },
  { username: 'albert.torres@iris-eng.com', password: 'IRIS2025$' },
  { username: 'sergio.nardini@unicampania.it', password: 'ASTEP2025&SN' },
]

export const logout = async () => {
  localStorage.removeItem('user')
}

export const login = async (username, password) => {
  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    throw { message: 'invalid username or password' }
  }
}


/* export const login = async (username, password) => {
  const body = {
    nom: username,
    password: password,
  }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  return fetch(`${apiURL}/login`, requestOptions)
    .then((response) => {
      if (response.status == 200) return response.json()
      else throw { message: 'invalid credentials' }
    })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res))
      return res
    })
    .catch((err) => alert(err.message))
} */
