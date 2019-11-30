const fs = require('fs')
const path = require('path')

const provinces = fs
  .readFileSync(path.resolve(__dirname, 'csv', 'provinces.csv'))
  .toString()
  .split('\n')

const regencies = fs
  .readFileSync(path.resolve(__dirname, 'csv', 'regencies.csv'))
  .toString()
  .split('\n')

const districts = fs
  .readFileSync(path.resolve(__dirname, 'csv', 'districts.csv'))
  .toString()
  .split('\n')

const villages = fs
  .readFileSync(path.resolve(__dirname, 'csv', 'villages.csv'))
  .toString()
  .split('\n')

const init = async () => {
  let collections = []
  console.log('Preparing data...')
  for (let i = 0; i < provinces.length; i++) {
    const item = provinces[i]
    if (item !== '') {
      const [id, name] = item.split(',')
      collections.push({
        id,
        name: name.replace('\r', ''),
        regencies: regencies
          .filter(item => {
            if (item !== '') {
              const [_, provinceID] = item.split(',')
              return provinceID === id
            }
            return null
          })
          .map(item => {
            const [id, provinceID, name] = item.split(',')
            return {
              id,
              name: name.replace('\r', ''),
              districts: districts
                .filter(item => {
                  if (item !== '') {
                    const [_, regencyID] = item.split(',')
                    return id === regencyID
                  }
                  return null
                })
                .map(item => {
                  const [id, regencyID, name] = item.split(',')
                  return {
                    id,
                    name: name.replace('\r', ''),
                    villages: villages
                      .filter(item => {
                        if (item !== '') {
                          const [_, districtID] = item.split(',')
                          return id === districtID
                        }
                        return null
                      })
                      .map(item => {
                        const [id, districtID, name] = item.split(',')
                        return {
                          id,
                          name: name.replace('\r', ''),
                        }
                      }),
                  }
                }),
            }
          }),
      })
    }
  }

  fs.writeFileSync('indonesia.json', JSON.stringify(collections, null, 2))
}

init()
