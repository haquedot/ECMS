import React, { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoMdCloudDownload } from "react-icons/io";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
});

// Create Document Component
const DocumentView = ({ user }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // Get full month name
    const year = date.getFullYear();

    // Determine the ordinal suffix for the day
    const ordinalSuffix = (n) => {
      const lastDigit = n % 10;
      const lastTwoDigits = n % 100;
      if (lastDigit === 1 && lastTwoDigits !== 11) return "st";
      if (lastDigit === 2 && lastTwoDigits !== 12) return "nd";
      if (lastDigit === 3 && lastTwoDigits !== 13) return "rd";
      return "th";
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  };

  const calculateEndDate = (joiningDate, contractLengthInMonths) => {
    const startDate = new Date(joiningDate);

    // Add the contract length in months
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + contractLengthInMonths,
      startDate.getDate()
    );

    // Format the resulting date
    const day = endDate.getDate();
    const month = endDate.toLocaleString("default", { month: "long" }); // Full month name
    const year = endDate.getFullYear();

    // Determine the ordinal suffix
    const ordinalSuffix = (n) => {
      const lastDigit = n % 10;
      const lastTwoDigits = n % 100;
      if (lastDigit === 1 && lastTwoDigits !== 11) return "st";
      if (lastDigit === 2 && lastTwoDigits !== 12) return "nd";
      if (lastDigit === 3 && lastTwoDigits !== 13) return "rd";
      return "th";
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  };
  const currentDate = new Date();
  return (
    <div className="w-full">
      <PDFViewer className="h-[90vh] w-full">
        <Document>
          <Page size="A4" style={styles.page}>
            <Image
              source="https://i.imgur.com/PMBjMWs.jpg"
              style={{ height: 70, width: "100%", marginTop: 10 }}
            />
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text>Prof. Abdul wahid</Text>
              <Text>Chief Investigator, Meity Project</Text>
              <Text>Dean, School of Technology</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#000",
                marginTop: 10,
              }}
            ></View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <Text style={{ textAlign: "right" }}>
                {formatDate(currentDate)}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Text>Name:</Text>
              <Text>{user?.name}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Text>Designation:</Text>
              <Text>{user?.designation}</Text>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  textDecoration: "underline",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Experience Letter
              </Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ textAlign: "justify" }}>
                This is to certify that {user?.name} worked as an
                {user?.designation} from {formatDate(user?.joiningDate)} to{" "}
                {calculateEndDate(user?.joiningDate, user?.contractLength)}.
                During his tenure with us, his contributions to the project
                funded by the Ministry of Electronics and Information Technology
                (MeitY), Government of India, are highly appreciated.
              </Text>
              <Text style={{ marginTop: 10, textAlign: "justify" }}>
                He is formally relieved from the project funded by the Ministry
                of Electronics and Information Technology (MeitY) at Maulana
                Azad National Urdu University as of{" "}
                {calculateEndDate(user?.joiningDate, user?.contractLength)}. We
                wish him all the best for his future endeavours.
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                marginTop: 90,
              }}
            >
              <Text style={{ textAlign: "right" }}>Prof.Abdul Wahid</Text>
              <Text style={{ textAlign: "right" }}>
                Chief Investigator, Meity Project
              </Text>
              <Text style={{ textAlign: "right" }}>
                Dean, School of Technology
              </Text>
              <Text style={{ textAlign: "right" }}>
                Department of Computer Science &
              </Text>
              <Text style={{ textAlign: "right" }}>Information Technology</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <Image
                source="https://i.imgur.com/PMBjMWs.jpg"
                style={{ height: 70, width: "100%", marginTop: 10 }}
              />
              <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text>Prof. Abdul wahid</Text>
                <Text>Chief Investigator, Meity Project</Text>
                <Text>Dean, School of Technology</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#000",
                  marginTop: 10,
                }}
              ></View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <Text style={{ textAlign: "right" }}>22nd July 2024</Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Text>Name:</Text>
                <Text>{user?.name}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <Text>Designation:</Text>
                <Text>{user?.designation}</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    textDecoration: "underline",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Experience Letter
                </Text>
              </View>
              <View style={{ marginTop: 30 }}>
                <Text style={{ textAlign: "justify" }}>
                  This is to certify that {user?.name} worked as an
                  {user?.designation} from {formatDate(user?.joiningDate)} to{" "}
                  {calculateEndDate(user?.joiningDate, user?.contractLength)}.
                  During his tenure with us, his contributions to the project
                  funded by the Ministry of Electronics and Information
                  Technology (MeitY), Government of India, are highly
                  appreciated.
                </Text>
                <Text style={{ marginTop: 10, textAlign: "justify" }}>
                  He is formally relieved from the project funded by the
                  Ministry of Electronics and Information Technology (MeitY) at
                  Maulana Azad National Urdu University as of{" "}
                  {calculateEndDate(user?.joiningDate, user?.contractLength)}.
                  We wish him all the best for his future endeavours.
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  marginTop: 90,
                }}
              >
                <Text style={{ textAlign: "right" }}>Prof.Abdul Wahid</Text>
                <Text style={{ textAlign: "right" }}>
                  Chief Investigator, Meity Project
                </Text>
                <Text style={{ textAlign: "right" }}>
                  Dean, School of Technology
                </Text>
                <Text style={{ textAlign: "right" }}>
                  Department of Computer Science &
                </Text>
                <Text style={{ textAlign: "right" }}>
                  Information Technology
                </Text>
              </View>
            </Page>
          </Document>
        }
        fileName={`${user?.name}.pdf`}
      >
        {({ loading }) =>
          loading ? (
            "Loading document..."
          ) : (
            <div className="flex items-center gap-[10px] mt-6">
              <IoMdCloudDownload className="text-3xl text-black hover:text-brown-800"/>
              <p className="text-black">Download</p>
            </div>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DocumentView;
