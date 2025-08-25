import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mant-libro-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mant-libro-register.html',   // 👈 nombre correcto
  styleUrls: ['./mant-libro-register.css']     // 👈 nombre correcto
})
export class MantLibroRegisterComponent {
  libroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.minLength(10)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.libroForm.valid) {
      console.log('📘 Libro registrado:', this.libroForm.value);
      alert('✅ Libro registrado con éxito');
      this.libroForm.reset();
    } else {
      alert('⚠️ Completa todos los campos correctamente');
    }
  }
}
