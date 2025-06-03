const apiURL = ''

const users = [
  { username: 'astep1', password: 'astep12345!', name:'Admin' },
  { username: 'rovira@ind.uned.es', password: 'APD_1404', name:'Antonio J. Rovira' },
  { username: 'info@analisis-dsc.com', password: 'Madrid2025', name:'Juan Enriquez Paraled' },
  { username: 'juanp.solano@upct.es', password: 'UPCTASTEP884411?', name:'Juan Pedro' },
  { username: 'p.a.kew@hw.ac.uk', password: 'Poppy2025!', name:'Peter Kew' },
  { username: 'Valentina.Stojceska@brunel.ac.uk', password: 'Brunel1966#', name:'Valentina Stojceska' },
  { username: 'giannaa@ebos.com.cy', password: 'avgousti55!', name:'Gianna Avgousti' },
  { username: 'anna.dmitruk@pwr.edu.pl', password: 'DashAstep2020' , name:'Anna Dmitruk'},
  { username: 'ruben.abbas@upm.es', password: 'ASTEP25', name:'Rubén Abbas' },
  { username: 'aandr@cres.gr', password: 'lonelyrider0409', name:'Andreas Androutsopoulos' },
  { username: 'drosou@cres.gr', password: 'SSSD2025!', name:'Vasiliki Drosou' },
  { username: 'albert.torres@iris-eng.com', password: 'IRIS2025$', name:'AAlbert Torres' },
  { username: 'sergio.nardini@unicampania.it', password: 'ASTEP2025&SN', name:'Prof. Sergio Nardini' },
  { username: 'Dimitrios.Gkavopoulos@relationalfs.com', password: 'qaz123!@#', name:'Dimitrios Gkavopoulos' },
  { username: 'vasilis@mandrekas.gr', password: 'Mandrekas1954!', name:'Vasilis Mandrekas' },


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
