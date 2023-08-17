import React from 'react';
import { Page, Document, View, StyleSheet } from '@react-pdf/renderer';
import TableComponent from './TableComponent';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PDFComponent = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <TableComponent data={data} />
      </View>
    </Page>
  </Document>
);

export default PDFComponent;
