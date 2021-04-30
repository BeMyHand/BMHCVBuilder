import React, {useEffect, useState} from "react";
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
        flexDirection: "column",
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
    },
    mainSection1c2: {
        //backgroundColor: "orangered",
    },
    mainSection1c3: {
        //backgroundColor: "purple",
    },
    mainSection1C3Main: {
        //backgroundColor: "grey",
        flexDirection: "column"
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
        marginLeft: 30,
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
        backgroundColor: "#00444f"
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
        marginBottom: 5
    },
    primaryHeading: {
        fontSize: 15,
        color: "#000000",
        backgroundColor: "silver",
        marginBottom: 10
    },
    secondaryHeading: {
        fontSize: 11,
        color: "#00404f",
        marginBottom: 10,
        marginRight: 10
    },
    tertiaryHeading: {
        fontSize: 10,
        color: "#00404f",
        marginBottom: 10
    },
    centerText: {
        textAlign: "center"
    },
    sectionMargin: {
        marginBottom: 30
    },
    line: {
        height: 1,
        backgroundColor: "grey",
        opacity: 0.5,
        margin: 20,
        marginBottom: 10
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
        Novice: 2,
        Beginner: 4,
        Skillful: 6,
        Experienced: 8,
        Expert: 10
    };

    for (let i = 0; i < skills.length; i++) {
        skills[i].level = skills[i].level.trim();
    }
    console.log(skills, "==skills");
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
        props.cvData &&
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.mainSection1c1}>
                    <View>
                        {cvData.image ? (
                            <Image
                                style={styles.mainSection1C1MainPic}
                                src={cvData.image}
                            ></Image>
                        ) : null}
                    </View>
                    <View
                        style={{...styles.mainSection1C1MainText, ...styles.centerText}}
                    >
                        <Text style={styles.bigHeading}>
                            {[
                                cvData["first-name"] ? cvData["first-name"] : "",
                                cvData["last-name"] ? cvData["last-name"] : ""
                            ].join(" ")}
                        </Text>
                        <Text style={styles.primaryHeading}>{cvData["job-title"]}</Text>
                        <Text style={styles.mainSection1Text}>
                            {cvData["city"] ? cvData["city"] : ""}{" "}
                            {cvData["country"] ? cvData["country"] : ""}
                        </Text>
                    </View>
                    <Text style={styles.line}></Text>
                </View>
                <View style={{flexDirection: "row", flexShrink: 1}}>
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
                                <Text style={styles.mainSection2Text}>{cvData["e-mail"]}</Text>
                            ) : null}
                            {cvData["phone"] ? (
                                <Text style={styles.mainSection2Text}>{cvData["phone"]}</Text>
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
                        {skills ?
                            skills.length > 0 ?
                                (<View style={styles.mainSection2c2}>
                                    <Text style={styles.primaryHeading}>
                                        {skills ? (skills.length > 0 ? "Skills" : "") : ""}
                                    </Text>
                                    {skills?.map(skill => {
                                        let k = Math.random();
                                        return (
                                            <View key={k}>
                                                <Text style={styles.secondaryHeading}>{skill?.skill}</Text>
                                                <View style={styles.starSection}>
                                                    {skill?._stars.map(star => {
                                                        let k = Math.random();
                                                        return (
                                                            <Text key={k} style={styles.star}></Text>
                                                        );
                                                    })}
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>) : <React.Fragment></React.Fragment> : <React.Fragment></React.Fragment>}
                    </View>
                    <View style={styles.mainSection1}>
                        <View style={{...styles.mainSection1c2, ...styles.sectionMargin}}>
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
                                <View style={styles.mainSection1c3}>
                                    <Text style={styles.primaryHeading}>Work History</Text>
                                    {employmentDetails.map(ele => {
                                        return (
                                            <View
                                                style={{
                                                    ...styles.mainSection1C3Main,
                                                    ...styles.sectionMargin
                                                }}
                                            >
                                                <View style={{marginRight: 30}}>
                                                    <Text style={styles.mediumHeading}>
                                                        {ele["job-title"] ? ele["job-title"] : ""}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <View style={{flexDirection: "row"}}>
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
                                                    <Text style={styles.mainSection1Text}>
                                                        {ele["description"] ? ele["description"] : ""}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            ) : null
                        ) : null}

                        {educationDetails ? (
                            educationDetails.length > 0 ? (
                                <View style={styles.mainSection1c3}>
                                    <Text style={styles.primaryHeading}>Education</Text>
                                    {educationDetails.map(ele => (
                                        <View
                                            style={{
                                                ...styles.mainSection1C3Main,
                                                ...styles.sectionMargin
                                            }}
                                        >
                                            <View style={{marginRight: 30}}>
                                                <Text style={styles.mediumHeading}>
                                                    {ele.degree ? ele.degree : ""}
                                                </Text>
                                            </View>
                                            <View>
                                                <View style={{flexDirection: "row"}}>
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

export default Templatepdf;
