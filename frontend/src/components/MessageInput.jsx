import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Smile } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-6 w-full bg-white/40 backdrop-blur-sm border-t border-white/20">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-2xl border-2 border-white/50 shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-white
              flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-base-content">Image ready to send</p>
            <p className="text-xs text-base-content/60">Click send to share this image</p>
          </div>
        </div>
      )}

      {/* Message Form */}
      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        <div className="flex-1 relative">
          {/* Input Field */}
          <div className="relative">
            <textarea
              className="w-full p-4 pr-20 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/30 
              focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300
              resize-none min-h-[60px] max-h-32 placeholder:text-base-content/50"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={1}
              style={{
                minHeight: '60px',
                maxHeight: '120px'
              }}
            />
            
            {/* Action Buttons */}
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                type="button"
                className="group p-2 rounded-xl hover:bg-white/40 transition-all duration-300 hover:scale-110"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="size-4 text-base-content/60 group-hover:text-primary transition-colors" />
              </button>
              <button
                type="button"
                className="group p-2 rounded-xl hover:bg-white/40 transition-all duration-300 hover:scale-110"
              >
                <Smile className="size-4 text-base-content/60 group-hover:text-accent transition-colors" />
              </button>
            </div>
          </div>
          
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`group p-4 rounded-2xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
            text.trim() || imagePreview
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-premium hover:shadow-glow"
              : "bg-white/40 backdrop-blur-sm border border-white/30 text-base-content/40"
          }`}
        >
          <Send className="size-5 group-hover:translate-x-0.5 transition-transform duration-300" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
