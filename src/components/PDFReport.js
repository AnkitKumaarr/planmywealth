import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { FaFileAlt, FaPhoneAlt, FaFolderOpen, FaWallet } from "react-icons/fa";
import AdvisorProfileSection from "@/app/generatereport/AdvisorProfileSection";

Font.register(
  {
    family: "Poppins",
    src: "http://fonts.gstatic.com/s/poppins/v1/TDTjCH39JjVycIF24TlO-Q.ttf",
    fontStyle: "normal",
    fontWeight: 900,
  },
  {
    family: "Poppins",
    src: "http://fonts.gstatic.com/s/poppins/v1/TDTjCH39JjVycIF24TlO-Q.ttf",
    fontStyle: "normal",
    fontWeight: 400,
  },
  {
    family: "Poppins",
    src: "http://fonts.gstatic.com/s/poppins/v1/TDTjCH39JjVycIF24TlO-Q.ttf",
    fontStyle: "normal",
    fontWeight: 600,
  }
);

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "white",
    fontFamily: "Poppins",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 900,
    marginBottom: 20,
  },
  subtitle: {
    fontWeight: 900,
    fontSize: 18,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 900,
    marginBottom: 4,
  },
  blueBox: {
    backgroundColor: "#DBEAFE",
    padding: 24,
    borderRadius: 8,
    marginBottom: 4,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flexCol: {
    flexDirection: "column",
  },
  boldValue: {
    fontSize: 20,
    fontWeight: 900,
    borderBottom: 4,
    borderColor: "#48BB78",
    paddingBottom: 2,
  },
  smallText: {
    fontSize: 10,
    color: "#4A5568",
  },
  analysisTitle: {
    fontSize: 12,
    fontWeight: 900,
    marginTop: 8,
    marginBottom: 8,
  },
  bulletList: {
    paddingLeft: 16,
  },
  bulletPoint: {
    fontSize: 10,
    color: "#4A5568",
    marginBottom: 4,
    flexDirection: "row",
  },
  bullet: {
    marginRight: 8,
  },
  recommendationBox: {
    borderWidth: 2,
    borderColor: "#48BB78",
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
  },
  disclaimer: {
    fontSize: 8,
    color: "#666666",
    marginTop: 40,
  },
  disclaimerBold: {
    fontWeight: 900,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 900,
    marginBottom: 16,
  },
  blueContainer: {
    backgroundColor: "#DBEAFE",
    padding: 24,
    borderRadius: 8,
    marginBottom: 2,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  amount: {
    fontSize: 14,
    fontWeight: 900,
  },
  rupeeSymbol: {
    fontSize: 14,
    fontWeight: 900,
  },
  croreText: {
    fontSize: 14,
    fontWeight: 900,
    marginBottom: 4,
  },
  underline: {
    borderBottomWidth: 4,
    borderBottomColor: "#48BB78",
    paddingBottom: 2,
  },
  description: {
    fontSize: 10,
    color: "#4A5568",
    flex: 1,
    marginLeft: 8,
  },
  subheading: {
    fontSize: 12,
    fontWeight: 900,
    marginBottom: 4,
  },
  bulletText: {
    fontSize: 10,
    color: "#4A5568",
    flex: 1,
    lineHeight: 1.5,
  },
});

// Helper component for bullet points
const BulletPoint = ({ children }) => (
  <View style={styles.bulletPoint}>
    <Text style={styles.bullet}>•</Text>
    <Text style={{ flex: 1 }}>{children}</Text>
  </View>
);

const PDFReport = ({ user, report }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 24 }}>
            {user?.name}! Your Report is Ready!
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Here's the smartest way to financially secure your family
          </Text>
        </View>

        {/* 1st section  */}
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.sectionTitle}>
            1. Additional Term Insurance cover your family needs
          </Text>

          <View style={styles.blueContainer}>
            <View style={styles.amountContainer}>
              <View style={styles.underline}>
                <Text style={styles.amount}>
                  {report?.additionalCoverNeeded}
                </Text>
              </View>
              <Text style={styles.description}>
                Minimum Term Insurance cover your family needs
                {report?.additionalCoverNeeded} - Cover you already have
                {report?.termInsuranceAmount}
              </Text>
            </View>
          </View>

          <Text style={styles.subheading}>
            Ensure Your Family's Financial Security with Term Insurance
          </Text>

          <View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                A term plan safeguards your family's lifestyle and goals, even
                if you're not around. By investing in a term plan, your nominee
                can invest the sum of Death Maturity in Basic Fixed Deposit
                (6-7% interest) to cover day-to-day expenses for the next 15
                years. The principal can also help fulfill key goals like child
                education, loan repayment, and marriage.
              </Text>
            </View>

            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                With adequate coverage, you can rest easy knowing that your
                family won't face financial stress, regardless of the
                circumstances.
              </Text>
            </View>
          </View>
        </View>
        {/* 2nd section  */}
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.sectionTitle}>
            2. Additional Health Insurance cover your family needs
          </Text>

          <View style={styles.blueContainer}>
            <View style={styles.amountContainer}>
              <View style={styles.underline}>
                <Text style={styles.amount}>
                  {report?.additionalHealthCoverNeeded || "0"}
                </Text>
              </View>
              <Text style={styles.description}>
                Minimum Sum Insured cover your family needs{" "}
                {report?.additionalHealthCoverNeeded || "₹ 0"} Cover you already
                have{" "}
                {report?.healthInsuranceAmount === ""
                  ? "₹ 0"
                  : report?.healthInsuranceAmount}{" "}
                . Do Port/Switch Your Existing Old Insurance to Latest and Best
                One.
              </Text>
            </View>
          </View>

          <Text style={styles.subheading}>
            Why Health Insurance is Essential
          </Text>

          <View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                The Covid-19 pandemic has shown how unpredictable medical
                emergencies can be, potentially leading to financial strain.
                Without health insurance, your savings and wealth could be at
                risk during a medical crisis. Based on your income, a minimum
                cover of
                {report?.additionalHealthCoverNeeded || "  0"} is recommended
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFReport;
