// import React, { useState } from "react";
// import { Row, Col, Table, Button, Toast } from "react-bootstrap";
// import "./ComponentsStyle.css";

// export default function SearchKatas() {
//   const [showA, setShowA] = useState(true);

//   const toggleShowA = () => setShowA(!showA);

//   const handleReserve = () => {
//     //Reserve a kata to a specific person!
//       setShowA(!showA);
//   }
  

//   return (
//     <>
//       <Row>
//         <Table bordered className="katasReserved">
//           <tbody className="whiteFont">
//             <tr>
//               <Row>
//                 <Col md={4} className="mt-2 d-flex justify-content-center">
//                   <td colSpan={2}>Name of Kata Searched</td>
//                 </Col>
//                 <Col md={4} className="mt-2 d-flex justify-content-center">
//                   <td colSpan={2}>Kyu Level of Kata Searched</td>
//                 </Col>
//                 <Col md={4} className="d-flex justify-content-center">
//                   <td colSpan={2}>
//                     {" "}
//                     <Button onClick={handleReserve} variant="success" className="reserveButton">
//                       Reserve
//                     </Button>
//                   </td>
//                 </Col>
//               </Row>
//             </tr>
//           </tbody>
//         </Table>
//       </Row>

//       {/* Error Message should only appear when the user clicks on a kata that is already reserved or completed (below) */}

//     <Row className="d-flex justify-content-center">
//       <Col md={6} className="mb-2 d-flex justify-content-center">       
//         <Toast show={showA} onClose={toggleShowA} className="katasErrorMsg">
//           <Toast.Header> 
//             <strong className="me-auto">Error</strong>
//           </Toast.Header>
//           <Toast.Body>This Kata is already reserved or completed!</Toast.Body>
//         </Toast>
//       </Col>
//     </Row>
//     </>
//   );
// }
