import React, { useContext, useState  } from 'react';
import UserContext from '../../context/UserContext';


//data for table
const data = [
  { name: "Hot Topic", descrption: "Emo Merchandise", loc: "420 Lane Ave." },
  { name: "Taco Tuesdays", descrption: "Taco Truck", loc: "123 Sesame St." },
  { name: "Horses Galore", descrption: "Buy a Horse", loc: "9000 Barn St." },
]

//table style
const styles = {
  table: { width: '100%', tableLayout: 'fixed', border: '1px solid black'},
  nameColumn: { width: '20%', border: '1px solid black' },
  descrptionColumn: { width: '40%', border: '1px solid black' },
  locColumn: { width: '30%', border: '1px solid black' },
};

function Reviews() {
  const { user } = useContext(UserContext);

  /**/

  console.log("Reviews component rendered");


  if (user) {
    return (
      <div>
        <h2>Find a Buisness</h2>

        {/* Decorative Line */}
        <div>
          <hr style={{ border: '1px solid #000', margin: '20px 0' }} />
        </div>

        {/* Table */}
        <table style={styles.table}>
          <tr>
            <th style={styles.nameColumn}>Name</th>
            <th style={styles.descrptionColumn}>Description</th>
            <th style={styles.locColumn}>Address</th>
          </tr>
          {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td style={styles.nameColumn}>{val.name}</td>
                            <td style={styles.descrptionColumn}>{val.descrption}</td>
                            <td style={styles.locColumn}>{val.loc}</td>
                        </tr>
                    )
                })}
        </table>
      </div>
    );
  }
  
  return (
    <div>
      <p>Loading... or handle user authentication </p>
    </div>
  )
}

export default Reviews;
