import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { logo } from '../assets';

// Styling
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f8f8f8"
  },
  outerdiv: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  header: {

    display: "flex",
    gap: "4px",
    flexDirection: "row",
    height: "48px",
    alignItems: "center",
    backgroundColor: "#00629b",
    color: "#ffffff",
    flexShrink: "0"
  },
  image: {
    marginLeft: "16px",
    padding: "2px",
    width: "16px",
    height: "16px",
  },
  inv: {
    marginLeft: "16px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  normaltext: {
    fontSize: "12px",
    color: "#454444"
  },
  invoicediv: {
    margin: "16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  boxouter: {
    marginLeft: "16px",
    marginRight: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    border: "1px solid #cdcdcd"
  },

  boxinner: {
    display: "flex",
    gap: "0px",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",

  },

  boxinnerinnertitle: {

    display: "flex",
    flex: "2.25",
    gap: "0px",
    flexDirection: "column",
    borderRight: "1px solid #cdcdcd",
    borderBottom: "1px solid #cdcdcd"


  },
  boxinnerinner: {

    display: "flex",
    flex: "0.75",
    gap: "0px",
    flexDirection: "column",
    borderRight: "1px solid #cdcdcd",
    borderBottom: "1px solid #cdcdcd"


  },
  boxinnerlower: {
    backgroundColor:"#ffffff",
    display: "flex",
    alignItems: "flex-end"
  },
  boxuppertext: {
    padding: "4px",
    fontSize: "12px",
    color: "#454444",
    borderBottom:"1px solid #cdcdcd"
  },
  boxlowertext: {
    backgroundColor:"#ffffff",
    padding: "4px",
    fontSize: "12px",
    color: "#000000"
  },
  invoicetotal: {
    position: "relative",
    margin: "8px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  ticketouter: {
    margin: "16px",
    padding:"8px 16px",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    border:"1px solid #cdcdcd",
    borderStyle:"dashed"
  },
  poster: {
    width: "48px",
    height: "auto"
  },
  ticketinner: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "4px",
    fontSize: "12px",
    color: "#000000"
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold"
  }
})

// Generating tickets "count" number of times
const Ticket = ({ times, movie }) => {
  const date = new Date()
  const ticketElements = Array.from({ length: times }, (_, index) => (
    <View key={index}>
      <div style={styles.ticketouter}>
        <Image style={styles.poster} src={movie.Poster} />
        <div style={styles.ticketinner}>
          <Text style={styles.title}>{movie.Title}</Text>
          <Text style={styles.normaltext}>{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`}</Text>
          <Text style={styles.normaltext}>x1</Text>
          <Text style={styles.normaltext}>Total: $500</Text>

        </div>
      </div>
    </View>
  ));

  return (
    <View>
      {ticketElements}
    </View>
  );
};


//Document with required infos
const PdfFile = ({ formData, movieDetails, count }) => {
  return (
    <Document>
      <Page style={styles.page} >
        <View>
          <div style={styles.outerdiv}>
            <div style={styles.header}>
              <Image style={styles.image} src={logo} />
              <Text>TicketTrove</Text>
            </div>

            <Text style={styles.inv}>Invoice</Text>

            <div style={styles.invoicediv}>
              <div>
                <Text style={styles.normaltext}>{formData.name}</Text>
                <Text style={styles.normaltext}>{formData.address}</Text>
                <Text style={styles.normaltext}>{formData.country}</Text>
              </div>
              <div>
                <Text style={styles.normaltext}>Invoice ID:ufhbvsjd39</Text>
                <Text style={styles.normaltext}>{`Order Date: ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}</Text>
              </div>
            </div>

            <div style={styles.boxouter}>
              <div style={styles.boxinner}>

                <div style={styles.boxinnerinnertitle}>
                  <Text style={styles.boxuppertext}>
                    Event name
                  </Text>
                  <Text style={styles.boxlowertext}>
                    {movieDetails.Title}
                  </Text>
                </div>

                <div style={styles.boxinnerinner}>
                  <Text style={styles.boxuppertext}>
                    Event Type
                  </Text>
                  <Text style={styles.boxlowertext}>
                    {movieDetails.Type}
                  </Text>
                </div>

                <div style={styles.boxinnerinner}>
                  <Text style={styles.boxuppertext}>
                    Ticket
                  </Text>
                  <Text style={styles.boxlowertext}>
                    {`x${count}`}
                  </Text>
                </div>
                <div style={styles.boxinnerinner}>
                  <Text style={styles.boxuppertext}>
                    Unit Price
                  </Text>
                  <Text style={styles.boxlowertext}>
                    $500
                  </Text>
                </div>

                <div style={styles.boxinnerinner}>
                  <Text style={styles.boxuppertext}>
                    Discount
                  </Text>
                  <Text style={styles.boxlowertext}>
                    $0.00
                  </Text>
                </div>

                <div style={styles.boxinnerinner}>
                  <Text style={styles.boxuppertext}>
                    Total
                  </Text>
                  <Text style={styles.boxlowertext}>
                    {`${count * 500 + count * 500 * 0.13}`}
                  </Text>
                </div>
              </div>
              <div style={styles.boxinnerlower}>
                <Text style={styles.invoicetotal}>
                  {`Invoice Total : USD $${count * 500 + count * 500 * 0.13}`}
                </Text>
              </div>
            </div>

            <div>
              <Ticket times={count} movie={movieDetails} />
            </div>
          </div>
        </View>
      </Page>
    </Document>
  );
};

export default PdfFile;


