import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import React from "react";

interface DangerAlertProps {
  errors: string[]
}

export const DangerAlert: React.FC<DangerAlertProps> = ({errors}) => {

  return (
    <>
      <Alert variant="destructive">
       
        <AlertCircle className="h-4 w-4" />
       
        <AlertTitle>Error</AlertTitle>
        
        <AlertDescription>
          <ul>
            {errors.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </AlertDescription>

      </Alert>
    </>
  )
}