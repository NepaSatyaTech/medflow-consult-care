import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Appointment, AppointmentStatus } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface AppointmentListProps {
  appointments: Appointment[];
  onStatusChange: (appointmentId: string, status: AppointmentStatus) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments, 
  onStatusChange 
}) => {
  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null);
  const { toast } = useToast();

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleApprove = (id: string) => {
    onStatusChange(id, 'approved');
    toast({
      title: "Appointment Approved",
      description: "The appointment has been approved successfully."
    });
  };

  const handleReject = (id: string) => {
    onStatusChange(id, 'rejected');
    toast({
      title: "Appointment Rejected",
      description: "The appointment has been rejected."
    });
  };

  const handleComplete = (id: string) => {
    onStatusChange(id, 'completed');
    toast({
      title: "Appointment Completed",
      description: "The appointment has been marked as completed."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">{appointment.patientName}</TableCell>
              <TableCell>{appointment.consultationType}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <span className={`py-1 px-2 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(appointment)}
                  >
                    View
                  </Button>
                  {appointment.status === 'pending' && (
                    <>
                      <Button 
                        className="bg-medflow-green hover:bg-medflow-green-dark"
                        size="sm"
                        onClick={() => handleApprove(appointment.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleReject(appointment.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {appointment.status === 'approved' && (
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      size="sm"
                      onClick={() => handleComplete(appointment.id)}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View detailed information about the appointment
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Patient Name</h4>
                  <p>{selectedAppointment.patientName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Consultation Type</h4>
                  <p className="capitalize">{selectedAppointment.consultationType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date</h4>
                  <p>{selectedAppointment.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Time</h4>
                  <p>{selectedAppointment.time}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <p className="capitalize">{selectedAppointment.status}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p>{selectedAppointment.patientEmail}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                  <p>{selectedAppointment.patientPhone}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Reason for Consultation</h4>
                <p className="mt-1">{selectedAppointment.reason}</p>
              </div>

              {selectedAppointment.status === 'pending' && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    className="bg-medflow-green hover:bg-medflow-green-dark"
                    onClick={() => {
                      handleApprove(selectedAppointment.id);
                      setSelectedAppointment(null);
                    }}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleReject(selectedAppointment.id);
                      setSelectedAppointment(null);
                    }}
                  >
                    Reject
                  </Button>
                </div>
              )}
              
              {selectedAppointment.status === 'approved' && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => {
                      handleComplete(selectedAppointment.id);
                      setSelectedAppointment(null);
                    }}
                  >
                    Mark as Completed
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentList;
