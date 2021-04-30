import React, {useEffect} from "react";
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
        flexDirection: "row"
    },
    mainSection1C1MainPic: {
        //backgroundColor: "grey",
        borderRadius: 100,
        width: 60,
        height: 60,
        marginRight: 20
    },
    mainSection1C1MainText: {
        //backgroundColor: "pink",
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
        color: "#0080FF",
        marginBottom: 10
    },
    secondaryHeading: {
        fontSize: 11,
        color: "#0080FF",
        marginBottom: 5
    },
    centerText: {
        textAlign: "center"
    },
    sectionMargin: {
        marginBottom: 30
    }
});

const Templatepdf = props => {
    useEffect(() => {
        console.log("pdf componentdidupdate");
    }, []);
    let cvData = {};
    cvData = {...props.cvData};
    console.log(Object.keys(cvData).length);
    let employmentDetails = props.cvData["employment-history"]
        ? [...props.cvData["employment-history"]]
        : [];
    let educationDetails = props.cvData["education-history"]
        ? [...props.cvData["education-history"]]
        : [];
    let skills = props.cvData["skills"] ? [...props.cvData["skills"]] : [];
    let skillMap = {
        "Novice": 2,
        "Beginner": 4,
        "Skillful": 6,
        "Experienced": 8,
        "Expert": 10
    };

    for (let i = 0; i < skills.length; i++) {
        skills[i].level = skills[i].level.trim();
    }

    console.log(skills, "==skills");

    for (let i = 0; i < skills.length; i++) {
        let _stars = [];
        if (skills[i].level) {
            for (let j = 0; j < skillMap[skills[i].level.trim()]; j++) {
                _stars.push("*");
            }
        }
        skills[i]["_stars"] = [..._stars];
    }

    console.log();

    return (
        props.cvData &&
        <Document>
            <Page size="A4" style={styles.page}>
                {Object.keys(cvData).length > 0 ? (
                    <React.Fragment>
                        <View style={styles.mainSection1}>
                            <View
                                style={{...styles.mainSection1c1, ...styles.sectionMargin}}
                            >
                                <View>
                                    {cvData.image ? (
                                        <Image
                                            style={styles.mainSection1C1MainPic}
                                            src={cvData.image}
                                        ></Image>
                                    ) : null}
                                </View>
                                <View style={styles.mainSection1C1MainText}>
                                    <Text style={styles.bigHeading}>
                                        {[
                                            cvData["first-name"] ? cvData["first-name"] : "",
                                            cvData["last-name"] ? cvData["last-name"] : ""
                                        ].join(" ")}
                                    </Text>
                                    <Text style={styles.primaryHeading}>
                                        {cvData["job-title"]}
                                    </Text>
                                    <Text style={styles.mainSection1Text}>
                                        {cvData["city"] ? cvData["city"] : ""}{" "}
                                        {cvData["country"] ? cvData["country"] : ""}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{...styles.mainSection1c2, ...styles.sectionMargin}}
                            >
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
                                            ...styles.mainSection1c3,
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
                                                <View style={{marginRight: 30, flexGrow: 1}}>
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
                                                    <Text style={styles.mainSection1Text}>
                                                        {ele.city ? ele.city : ""}
                                                    </Text>
                                                </View>
                                                <View style={{flexGrow: 2.5}}>
                                                    <Text style={styles.mediumHeading}>
                                                        {ele.employer ? ele.employer : ""}
                                                    </Text>
                                                    <Text style={{fontSize: 14}}>
                                                        {ele["job-title"] ? ele['job-title'] : ""}
                                                    </Text>
                                                    <Text style={styles.mainSection1Text}>
                                                        {ele.description ? ele.description : ""}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                ) : null) : null}

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
                                                <View style={{marginRight: 30, flexGrow: 1}}>
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
                                                    <Text style={styles.mainSection1Text}>
                                                        {ele.city ? ele.city : ""}
                                                    </Text>
                                                </View>
                                                <View style={{flexGrow: 2.5}}>
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
                                ) : null) : null}
                        </View>
                        <View style={styles.mainSection2}>
                            <View style={styles.mainSection2c1}>
                                <Text style={styles.primaryHeading}>
                                    {cvData["email"] ||
                                    cvData["phone"] ||
                                    cvData["address"] ||
                                    cvData["postal-code"] ||
                                    cvData["driving-license"] ||
                                    cvData["nationality"]
                                        ? "Details"
                                        : ""}
                                </Text>
                                {cvData["e-mail"] ? (
                                    <Text style={styles.mainSection2Text}>
                                        {cvData["email"]}
                                    </Text>
                                ) : null}
                                {cvData["phone"] ? (
                                    <Text style={styles.mainSection2Text}>{cvData["phone"]}</Text>
                                ) : null}
                                {cvData["address"] ? (
                                    <Text style={styles.mainSection2Text}>
                                        {cvData["address"]}
                                    </Text>
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
                            {skills ?
                                skills.length > 0 ?
                                    (
                                        <View style={styles.mainSection2c2}>
                                            <Text style={styles.primaryHeading}>Skills</Text>
                                            {skills.map(skill => {
                                                return (
                                                    <View key={skill?.skill}>
                                                        <Text style={styles.mainSection2Text}>{skill?.skill}</Text>
                                                        <View style={styles.starSection}>
                                                            {skill._stars?.map(star => {
                                                                let k = Math.random();
                                                                return <Text key={k} style={styles.star}></Text>;
                                                            })}
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )
                                    : <React.Fragment></React.Fragment> : <React.Fragment></React.Fragment>}
                        </View>
                    </React.Fragment>
                ) : null}
            </Page>
        </Document>
    );
};
export default React.memo(Templatepdf);
