// DownloadExcel.ts
import * as XLSX from 'xlsx';
import { Button } from "../ui/button";

type StudentFormData = {
  name: string;
  email: string;
  extraFields: { [key: string]: string }[] ;
};

type RegisteredUserIds = {
  userId: string;
  qrCode: string;
  studentFormData: StudentFormData;
  checkIn: boolean;
};

type Post = {
  registeredUserIds: RegisteredUserIds[];
};

interface DownloadExcelProps {
  posts?: Post | undefined;
}

const DownloadExcel: React.FC<DownloadExcelProps> = ({ posts }) => {
  const downloadExcel = () => {
    const excelData = (posts?.registeredUserIds || []).map((user, index) => {
      const rowData: { [key: string]: string } = {
        Index: (index + 1).toString(),
        Name: user.studentFormData.name,
        Email: user.studentFormData.email,
      };

      if (typeof user.studentFormData.extraFields === 'object' && user.studentFormData.extraFields !== null) {
        Object.entries(user.studentFormData.extraFields).forEach(([key, value]) => {
          rowData[key] = (rowData[key] || '') + value;
        });
      }
      

      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, 'registration_data.xlsx');
  };

  return (
     <Button onClick={downloadExcel} style={{ backgroundColor: 'lightgreen', color: 'black', margin:'3px' }}>
    Download Excel
  </Button>
  );
};

export default DownloadExcel;
