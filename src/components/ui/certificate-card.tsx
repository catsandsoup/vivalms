import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Download, 
  Share2, 
  Calendar,
  User,
  CheckCircle
} from "lucide-react";

interface CertificateCardProps {
  title: string;
  completedDate: string;
  issuer?: string;
  certificateId?: string;
  score?: number;
  validUntil?: string;
  onDownload?: () => void;
  onShare?: () => void;
  className?: string;
}

export default function CertificateCard({
  title,
  completedDate,
  issuer = "Viva Mutual Learning Platform",
  certificateId,
  score,
  validUntil,
  onDownload,
  onShare,
  className = ""
}: CertificateCardProps) {
  return (
    <Card className={`card-viva overflow-hidden ${className}`}>
      {/* Certificate Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Certificate of Completion</h3>
              <p className="text-primary-foreground/80 text-sm">{issuer}</p>
            </div>
          </div>
          <Badge className="bg-white/20 text-primary-foreground border-white/30">
            <CheckCircle size={12} className="mr-1" />
            Verified
          </Badge>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-6">
        {/* Course Title */}
        <h4 className="text-xl font-semibold text-foreground mb-4 leading-tight">
          {title}
        </h4>

        {/* Certificate Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Completed:</span>
            <span className="font-medium text-foreground">{completedDate}</span>
          </div>

          {score && (
            <div className="flex items-center gap-2 text-sm">
              <Award size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Score:</span>
              <span className="font-medium text-foreground">{score}%</span>
              {score >= 80 && (
                <Badge className="bg-green-100 text-green-800 text-xs ml-2">
                  Excellent
                </Badge>
              )}
            </div>
          )}

          {validUntil && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Valid until:</span>
              <span className="font-medium text-foreground">{validUntil}</span>
            </div>
          )}

          {certificateId && (
            <div className="flex items-center gap-2 text-sm">
              <User size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Certificate ID:</span>
              <span className="font-mono text-xs text-foreground bg-muted px-2 py-1 rounded">
                {certificateId}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button 
            onClick={onDownload}
            className="btn-viva flex-1"
          >
            <Download size={16} className="mr-2" />
            Download PDF
          </Button>
          
          <Button 
            onClick={onShare}
            variant="outline"
            size="sm"
            className="px-3"
          >
            <Share2 size={16} />
          </Button>
        </div>

        {/* Verification Note */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            This certificate can be verified online using the certificate ID above.
            Valid for NDIS compliance and professional development records.
          </p>
        </div>
      </div>
    </Card>
  );
}