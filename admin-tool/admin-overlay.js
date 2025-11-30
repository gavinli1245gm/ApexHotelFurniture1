// Apex Admin Tool - Local Overlay
// This script is injected only in development mode

(function() {
  // Prevent multiple injections
  if (document.getElementById('apex-admin-root')) return;

  // 1. Fetch current config from server (we need a GET endpoint or we rely on defaults)
  // Since we are in dev mode, we can import json? No, this is client side.
  // Let's fetch the config.json directly if it's in public, but it's in src/data.
  // We will add a GET handler to /api/config for this tool to work perfectly.

  const styles = `
    #apex-admin-root { font-family: ui-sans-serif, system-ui, sans-serif; }
    .admin-btn { position: fixed; right: 0; top: 50%; transform: translateY(-50%); z-index: 9999; background: #D4AF37; color: white; padding: 12px; border-top-left-radius: 6px; border-bottom-left-radius: 6px; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: all 0.3s; border: none; }
    .admin-btn:hover { background: #C5A028; width: 60px; }
    .admin-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 500px; background: white; box-shadow: -4px 0 25px rgba(0,0,0,0.15); z-index: 10000; transform: translateX(100%); transition: transform 0.3s ease-in-out; display: flex; flex-direction: column; }
    .admin-drawer.open { transform: translateX(0); }
    .admin-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9998; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
    .admin-overlay.open { opacity: 1; pointer-events: auto; }
    .admin-header { padding: 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
    .admin-content { flex: 1; overflow-y: auto; padding: 20px; }
    .admin-footer { padding: 20px; border-top: 1px solid #eee; background: #f9fafb; display: flex; justify-content: flex-end; }
    .form-group { margin-bottom: 16px; }
    .form-label { display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 4px; }
    .form-input { width: 100%; border: 1px solid #d1d5db; rounded: 4px; padding: 8px; font-size: 14px; border-radius: 4px; box-sizing: border-box; }
    .form-input:focus { outline: none; border-color: #D4AF37; ring: 1px solid #D4AF37; }
    .btn { padding: 8px 16px; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
    .btn-primary { background: #D4AF37; color: white; }
    .btn-primary:hover { background: #C5A028; }
    .section-title { font-size: 12px; font-weight: 700; color: #111; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #eee; padding-bottom: 8px; margin: 24px 0 16px 0; }
    .spin { animation: spin 10s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    
    /* Toast */
    .admin-toast { position: fixed; bottom: 20px; right: 20px; background: white; border-left: 4px solid #10B981; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 4px; padding: 16px; z-index: 10002; transform: translateY(100px); opacity: 0; transition: all 0.3s; display: flex; align-items: center; pointer-events: none; }
    .admin-toast.show { transform: translateY(0); opacity: 1; }
    .admin-toast.error { border-left-color: #EF4444; }
  `;

  const html = `
    <style>${styles}</style>
    <button id="apex-admin-btn" class="admin-btn" title="Site Configuration">
      <svg class="spin" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    </button>
    <div id="apex-admin-overlay" class="admin-overlay"></div>
    <div id="apex-admin-drawer" class="admin-drawer">
      <div class="admin-header">
        <h2 style="margin:0; font-size:18px; font-weight:600; color:#D4AF37">Site Configuration</h2>
        <button id="apex-admin-close" style="background:none; border:none; cursor:pointer; font-size:24px; color:#999">&times;</button>
      </div>
      <div class="admin-content">
        <form id="apex-admin-form">
          <div class="section-title">Basic Information</div>
          <div class="form-group">
            <label class="form-label">Site Name</label>
            <input name="name" class="form-input" type="text">
          </div>
          <div class="form-group">
            <label class="form-label">SEO Title</label>
            <input name="title" class="form-input" type="text">
          </div>
          <div class="form-group">
            <label class="form-label">SEO Description</label>
            <textarea name="description" class="form-input" rows="3"></textarea>
          </div>
          
          <div class="section-title">Contact Information</div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input name="contact.email" class="form-input" type="email">
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input name="contact.phone" class="form-input" type="text">
          </div>
           <div class="form-group">
            <label class="form-label">WhatsApp</label>
            <input name="contact.whatsapp" class="form-input" type="text">
          </div>
           <div class="form-group">
            <label class="form-label">Address</label>
            <input name="contact.address" class="form-input" type="text">
          </div>

          <div class="section-title">Social Media</div>
           <div class="form-group">
            <label class="form-label">Facebook</label>
            <input name="social.facebook" class="form-input" type="text">
          </div>
           <div class="form-group">
            <label class="form-label">Instagram</label>
            <input name="social.instagram" class="form-input" type="text">
          </div>
           <div class="form-group">
            <label class="form-label">LinkedIn</label>
            <input name="social.linkedin" class="form-input" type="text">
          </div>
        </form>
      </div>
      <div class="admin-footer">
        <button id="apex-admin-save" class="btn btn-primary">Save Changes</button>
      </div>
    </div>
    <div id="apex-admin-toast" class="admin-toast">
      <div id="apex-admin-toast-msg" style="font-weight:500; color:#333"></div>
    </div>
  `;

  const container = document.createElement('div');
  container.id = 'apex-admin-root';
  container.innerHTML = html;
  document.body.appendChild(container);

  // Logic
  const btn = document.getElementById('apex-admin-btn');
  const close = document.getElementById('apex-admin-close');
  const drawer = document.getElementById('apex-admin-drawer');
  const overlay = document.getElementById('apex-admin-overlay');
  const saveBtn = document.getElementById('apex-admin-save');
  const form = document.getElementById('apex-admin-form');
  const toast = document.getElementById('apex-admin-toast');
  const toastMsg = document.getElementById('apex-admin-toast-msg');

  function toggleDrawer() {
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      loadConfig();
    }
  }

  btn.addEventListener('click', toggleDrawer);
  close.addEventListener('click', toggleDrawer);
  overlay.addEventListener('click', toggleDrawer);

  function showToast(msg, isError = false) {
    toastMsg.textContent = msg;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Check local storage for reload toast
  if (localStorage.getItem('apex_admin_saved')) {
    showToast('Configuration saved successfully!');
    localStorage.removeItem('apex_admin_saved');
  }

  async function loadConfig() {
    try {
      const res = await fetch('/api/config'); // We need to enable GET on this endpoint
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      
      // Populate form
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        const key = input.name;
        if (key.includes('.')) {
          const [parent, child] = key.split('.');
          input.value = data[parent]?.[child] || '';
        } else {
          input.value = data[key] || '';
        }
      });
    } catch (e) {
      console.error(e);
      // showToast('Failed to load configuration', true);
    }
  }

  saveBtn.addEventListener('click', async () => {
    const originalText = saveBtn.innerText;
    saveBtn.innerText = 'Saving...';
    saveBtn.disabled = true;

    const formData = {};
    const inputs = form.querySelectorAll('input, textarea');
    
    // Reconstruct JSON object
    // Simplified logic assuming known structure
    const config = { contact: {}, social: {} };
    inputs.forEach(input => {
      const key = input.name;
      if (key.includes('contact.')) config.contact[key.split('.')[1]] = input.value;
      else if (key.includes('social.')) config.social[key.split('.')[1]] = input.value;
      else config[key] = input.value;
    });
    
    // Merge missing static fields if necessary or handle in backend
    config.url = "https://apexhotelfurniture.com";
    config.author = "Apex Hotel Furniture";
    config.defaultImage = "/images/og-image.jpg";

    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      
      if (res.ok) {
        localStorage.setItem('apex_admin_saved', 'true');
        // HMR will reload the page automatically
        showToast('Saved!', false);
      } else {
        throw new Error('Save failed');
      }
    } catch (e) {
      showToast(e.message, true);
    } finally {
      saveBtn.innerText = originalText;
      saveBtn.disabled = false;
    }
  });

})();
