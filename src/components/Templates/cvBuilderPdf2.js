import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "3%"
  },
  // Section 1 styling
  mainSection1: {
    flexGrow: 2.5,
    flexBasis: 60,
    //backgroundColor: 'green',
    marginLeft: 30,
    marginRight: 30,
    flexDirection: "column"
  },
  mainSection1c1: {
    flexDirection: "column"
  },
  mainSection1C1MainPic: {
    width: 60,
    borderRadius: 2,
    height: 60,
    marginBottom: 5,
    //marginLeft: "50%",
    alignSelf: "center"
    //marginRight: 20,
  },
  mainSection1C1MainText: {
    //backgroundColor: "pink",
    textAlign: "center"
  },
  mainSection1c2: {
    //backgroundColor: "orangered",
  },
  mainSection1c3: {
    //backgroundColor: "purple",
  },
  mainSection1C3Main: {
    //backgroundColor: "grey",
    flexDirection: "row"
  },
  mainSection1c4: {
    //backgroundColor: "silver",
  },
  mainSection1Text: {
    fontSize: 10,
    margin: 2
  },
  // Section 1 styling end

  //Section 2 styling
  mainSection2: {
    flexGrow: 1,
    flexBasis: 40,
    //backgroundColor: 'orange',
    flexDirection: "column"
  },
  mainSection2c1: {
    //backgroundColor: 'yellow',
  },
  mainSection2c2: {
    //backgroundColor: 'red',
    marginTop: 20
  },
  starSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 30
  },
  star: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#0080FF"
  },
  mainSection2Text: {
    fontSize: 11,
    marginBottom: 10
  },
  // Section 2 styling end

  //subsection styling

  bigHeading: {
    color: "black",
    fontSize: 25,
    marginBottom: 2
  },
  mediumHeading: {
    color: "black",
    fontSize: 18,
    marginBottom: 10
  },
  primaryHeading: {
    fontSize: 15,
    color: "#008081",
    marginBottom: 10
  },
  secondaryHeading: {
    fontSize: 11,
    color: "#008081",
    marginBottom: 5
  },
  tertiaryHeading: {
    fontSize: 10,
    color: "grey",
    marginBottom: 5
  },
  center: {
    marginLeft: "50%",
    transform: "translate(-50%,0%)"
  },
  sectionMargin: {
    marginBottom: 30
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "grey",
    opacity: 0.5,
    marginBottom: 10
  }
});

const templatepdf = props => {
  let cvData = {};
  cvData = { ...props.cvData };
  console.log(Object.keys(cvData).length);
  let employmentDetails = props.cvData["employment-history"]
    ? [...props.cvData["employment-history"]]
    : [];
  let educationDetails = props.cvData["education-history"]
    ? [...props.cvData["education-history"]]
    : [];
  let skills = props.cvData["skills"] ? [...props.cvData["skills"]] : [];
  let skillMap = {
    novice: 2,
    beginner: 4,
    skillful: 6,
    experienced: 8,
    expert: 10
  };

  for (let i = 0; i < skills.length; i++) {
    skills[i].level = skills[i].level.trim();
  }

  for (let i = 0; i < skills.length; i++) {
    let _stars = [];
    if (skills[i].level) {
      for (let j = 0; j < skillMap[skills[i].level]; j++) {
        _stars.push("*");
      }
    }
    skills[i]["_stars"] = [..._stars];
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.mainSection1}>
          <View style={{ ...styles.mainSection1c1, ...styles.sectionMargin }}>
            <View>
              {cvData.image ? (
                <Image
                  style={styles.mainSection1C1MainPic}
                  src={cvData.image}
                ></Image>
              ) : null}
            </View>
            <View
              style={{ ...styles.mainSection1C1MainText, ...styles.centerText }}
            >
              <Text style={styles.bigHeading}>
                {[
                  cvData["first-name"] ? cvData["first-name"] : "",
                  cvData["last-name"] ? cvData["last-name"] : ""
                ].join(" ")}
              </Text>
              <Text style={styles.primaryHeading}>{cvData["job-title"]}</Text>
              <Text style={styles.tertiaryHeading}>
                {cvData["city"] ? cvData["city"] : ""}{" "}
                {cvData["country"] ? cvData["country"] : ""}
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {cvData["e-mail"] ? (
              <Text style={styles.tertiaryHeading}>{cvData["e-mail"]}</Text>
            ) : null}
            {cvData["phone"] ? (
              <Text style={styles.tertiaryHeading}>{cvData["phone"]}</Text>
            ) : null}
            {cvData["address"] ? (
              <Text style={styles.mainSection2Text}>{cvData["address"]}</Text>
            ) : null}
            {cvData["postal-code"] ? (
              <Text style={styles.mainSection2Text}>
                {cvData["postal-code"]}
              </Text>
            ) : null}
            {cvData["driving-license"] ? (
              <Text style={styles.mainSection2Text}>
                {cvData["driving-license"]}
              </Text>
            ) : null}
            {cvData["nationality"] ? (
              <Text style={styles.mainSection2Text}>
                {cvData["nationality"]}
              </Text>
            ) : null}
          </View>
          <Text style={styles.line}></Text>

          <View style={styles.subsection}>
            <View style={{ ...styles.mainSection1c2, ...styles.sectionMargin }}>
              {cvData["personal-statement"] ? (
                <React.Fragment>
                  <Text style={styles.primaryHeading}>Profile</Text>
                  <Text style={styles.mainSection1Text}>
                    {cvData["personal-statement"]}
                  </Text>
                </React.Fragment>
              ) : null}
            </View>

            {employmentDetails ? (
                employmentDetails.length > 0 ? (
                    <View
                        style={{
                          ...styles.mainSection1c4,
                          ...styles.sectionMargin
                        }}
                    >
                      <Text style={styles.primaryHeading}>Work History</Text>
                      {employmentDetails.map(ele => (
                          <View
                              style={{
                                ...styles.mainSection1C3Main,
                                ...styles.sectionMargin
                              }}
                          >
                            <View style={{ marginRight: 30, flexBasis: 150 }} wrap={false}>
                              <Text style={styles.secondaryHeading}>
                                {ele['starting-month']
                                    ? ele['starting-month'] : ''}
                                {ele['starting-year']
                                    ? ele['starting-year']
                                        ? `, ${ele['starting-year']}`
                                        : ""
                                    : ""}{" "}
                                -{" "}
                                {ele['end-date']
                                    ? ele['end-date']
                                    : ""}
                              </Text>
                              <Text style={styles.tertiaryHeading}>
                                {ele.city ? ele.city : ""}
                              </Text>
                            </View>
                            <View style={{ flexGrow: 2.5 }}>
                              <Text style={styles.mediumHeading}>
                                {ele['job-title'] ? ele['job-title'] : ""}
                              </Text>
                              <Text style={{fontSize: 14}}>
                                {ele.employer ? ele.employer : ""}
                              </Text>
                              <Text style={styles.mainSection1Text}>
                                {ele.description ? ele.description : ""}
                              </Text>
                            </View>
                          </View>
                      ))}
                    </View>
                ) : null
            ) : null}
              {educationDetails ? (
                educationDetails.length > 0 ? (
                  <View
                    style={{
                      ...styles.mainSection1c4,
                      ...styles.sectionMargin
                    }}
                  >
                    <Text style={styles.primaryHeading}>Education</Text>
                    {educationDetails.map(ele => (
                      <View
                        style={{
                          ...styles.mainSection1C3Main,
                          ...styles.sectionMargin
                        }}
                      >
                      <View style={{ marginRight: 30, flexBasis: 150 }} wrap={false}>
                          <Text style={styles.secondaryHeading}>
                            {ele['starting-month']
                                ? ele['starting-month'] : ''}
                            {ele['starting-year']
                                ? ele['starting-year']
                                    ? `, ${ele['starting-year']}`
                                    : ""
                                : ""}{" "}
                            -{" "}
                            {ele['end-date']
                                ? ele['end-date']
                                : ""}
                          </Text>
                          <Text style={styles.tertiaryHeading}>
                            {ele.city ? ele.city : ""}
                          </Text>
                        </View>
                        <View style={{ flexGrow: 2.5 }}>
                          <Text style={styles.mediumHeading}>
                            {ele.degree ? ele.degree : ""}
                          </Text>
                          <Text style={{fontSize: 14}}>
                            {ele.school ? ele.school : ""}
                          </Text>
                          <Text style={styles.mainSection1Text}>
                            {ele.description ? ele.description : ""}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : null
              ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default templatepdf;
